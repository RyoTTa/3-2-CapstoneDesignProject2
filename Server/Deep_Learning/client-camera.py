import cv2
import socket
import numpy as np
import requests
import time
import sys

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
## server ip, port
s.connect(('155.230.28.207', 8487))

cam = cv2.VideoCapture(0)
#cam.set(3,320)
#cam.set(4,240)

encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]

while True:
	try:

		msg = s.recv(1024)
		print(msg.decode('utf-8'))
    
		#img = cv2.imread('smoking.jpg', cv2.IMREAD_COLOR)

		ret, img = cam.read()
		cv2.imshow("Test",img)
		cv2.waitKey(1)

		result, img = cv2.imencode('.jpg', img, encode_param)
		data = np.array(img)
		stringData = data.tostring();
		s.sendall((str(len(stringData))).encode().ljust(16) + stringData)
	
	except KeyboardInterrupt:
		s.close()
		sys.exit()
