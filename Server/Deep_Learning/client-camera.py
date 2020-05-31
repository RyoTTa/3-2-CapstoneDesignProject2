import cv2
import socket
import numpy as np
import requests
import time
import sys
import base64
import pygame

id = str(sys.argv[1])
currentTime = 0
detectCount = 0
tobaccoTime = 0
smokeTime = 0
transTime = 0

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('155.230.28.207', 8488))

cam = cv2.VideoCapture(0)
cam.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cam.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

pygame.mixer.init()
alert = pygame.mixer.Sound("alert2.wav")

url = "http://155.230.28.207:3000/capture_insert"

encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]

datas ={
	'id' : id,
	'count' : 0
}

while True:
	try:
		msg = s.recv(1024)
		msgDecode = msg.decode('utf-8')
		print(msgDecode)
		currentTime = time.time()/60
		print(currentTime)
		print(transTime)
		
		if msgDecode[0:9] == 'detection' :
			#if abs(transTime - currentTime) >3 :
			if abs(transTime - currentTime) >3 :
				fileName = id+str(time.time())+'.jpg'
				transTime = currentTime
				detectCount = int(msgDecode[9:10])
				datas ={
					'id' : id,
					'count' : detectCount
				}
				cv2.imwrite(fileName,temp)
				files = {'file':open(fileName,'rb')}	
				res = requests.post(url,files=files,data=datas)
				print(res.text)
				alert.play()
				print('transmission')
			elif abs(transTime - currentTime) < 3 and detectCount < int(msgDecode[9:10]) :
				fileName = id+str(time.time())+'.jpg'
				transTime = currentTime
				detectCount = int(msgDecode[9:10])
				datas ={
					'id' : id,
					'count' : detectCount
				}
				cv2.imwrite(fileName,temp)
				files = {'file':open(fileName,'rb')}	
				res = requests.post(url,files=files,data=datas)
				print(res.text)
				alert.play()
				print('transmission')

		ret, img = cam.read()
		cv2.imshow("Test",img)
		cv2.waitKey(1)
		temp = img

		result, img = cv2.imencode('.jpg', img, encode_param)
		data = np.array(img)
		stringData = data.tostring()
		s.sendall((str(len(stringData))).encode().ljust(16) + stringData)
	
	except KeyboardInterrupt:
		s.close()
		sys.exit()
