import cv2
from darkflow.net.build import TFNet
import matplotlib.pyplot as plt
import numpy as np
import socket
import requests
import time
import select


def recvall(sock, count):
	buf = b''
	while count:
		newbuf = sock.recv(count)
			
		if not newbuf: return None
		buf += newbuf
		count -= len(newbuf)
	return buf

HOST='155.230.28.207'
PORT=8487

options = {
    'model' : 'cfg/yolo-obj.cfg',
    'load' : 'bin/yolo-obj.weights',
    'threshod' : 0.1,
    'gpu' : 0.85
}

tfnet = TFNet(options)

s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
print('Socket created')

s.bind((HOST,PORT))
print('Socket bind complete')

s.listen()
print('Socket now listening')

input_list = [s]

while True:
	input_ready, write_ready, except_ready = select.select(input_list, input_list, [])
 
	for ir in input_ready:
		
		if ir == s:
			conn, addr = s.accept()
			input_list.append(conn)
			print(conn.getpeername(), 'open', flush=True)
			conn.send("activate".encode('utf-8'))

		else:
			try : 
				length = recvall(ir, 16)
				if length : 
					stringData = recvall(ir, int(length))
        	
					data = np.fromstring(stringData, dtype = 'uint8')
	
					frame = cv2.imdecode(data, cv2.IMREAD_COLOR)
					frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
	
					results = tfnet.return_predict(frame)
        	
					colors = [tuple(255*np.random.rand(3)) for _ in range(10)]
					for color, result in zip(colors, results) :
						if result['confidence'] >= 0.1 : 
							t1 = (result['topleft']['x'], result['topleft']['y'])
							br = (result['bottomright']['x'], result['bottomright']['y'])
							label = result['label']
							print(result)
							#r = requests.post('http://155.230.28.207:3000/camera_insert',data={'id':"0",'time':'2020-04-03-14:23', 'cnt':'1'})
							#print(r.text)
        	
							frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
							frame = cv2.rectangle(frame, t1, br, color, 7)
							frame = cv2.putText(frame, label, t1, cv2.FONT_HERSHEY_COMPLEX, 1, (0,0,0), 2)
					if results :
						cv2.imshow("Test",frame)
						cv2.waitKey(1)	
						ir.send("detection".encode('utf-8'))
					else :
						ir.send("activation".encode('utf-8'))

				else:
					print(ir.getpeername(), 'close', flush=True)
					ir.close()
					input_list.remove(ir)
			except socket.error:
				#print(ir.getpeername(), 'close', flush=True)
				#ir.close()
				input_list.remove(ir)
	
