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
    'gpu' : 0.7
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
		else:
			print(ir.getpeername(), 'close', flush=True)
			ir.close()
			input_list.remove(ir)

	for wr in write_ready:
		wr.send("activate".encode('utf-8'))
        
		length = recvall(wr, 16)
		stringData = recvall(wr, int(length))
        
		data = np.fromstring(stringData, dtype = 'uint8')

		frame = cv2.imdecode(data, cv2.IMREAD_COLOR)
		frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
		plt.imshow(frame)
		#img = cv2.imread('fire.jpg', cv2.IMREAD_COLOR)
		#img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
		img = frame
		#img = cv2.imread("test.jpg")

		results = tfnet.return_predict(img)

		#img.shape
		#plt.imshow(img)
        
		colors = [tuple(255*np.random.rand(3)) for _ in range(10)]
		for color, result in zip(colors, results) :
			if result['confidence'] >= 0.1 : 
				t1 = (result['topleft']['x'], result['topleft']['y'])
				br = (result['bottomright']['x'], result['bottomright']['y'])
				label = result['label']
				print(result)
		#r = requests.post('http://155.230.28.207:3000/camera_insert',data={'id':"0",'time':'2020-04-03-14:23', 'cnt':'1'})
		#print(r.text)
        
			img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
			img = cv2.rectangle(img, t1, br, color, 7)
			img = cv2.putText(img, label, t1, cv2.FONT_HERSHEY_COMPLEX, 1, (0,0,0), 2)
    
		plt.imshow(img)
                
