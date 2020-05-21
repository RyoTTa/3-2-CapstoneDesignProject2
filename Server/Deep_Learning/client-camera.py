import cv2
import socket
import numpy as np
import requests
import time
import sys
import base64
import pygame

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('155.230.28.207', 8487))

cam = cv2.VideoCapture(0)
cam.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cam.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

id = '001'
currentTime = 0
detectCount = 0
tobaccoTime = 0
smokeTime = 0
transTime = 0

pygame.mixer.init()
alert = pygame.mixer.Sound("alert2.wav")

url = "http://155.230.28.207:3000/capture_insert"


encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]

datas ={
	'id' : id,
	'count' : 1
}

while True:
	try:
		msg = s.recv(1024)
		msgDecode = msg.decode('utf-8')
		print(msgDecode)
		currentTime = time.time()/60
		
		if msgDecode =='detection' :
			fileName = id+str(time.time())+'.jpg'
			transTime = currentTime
			#cv2.imwrite(fileName,temp)
			#files = {'file':open(fileName,'rb')}	
			#res = requests.post(url,files=files,data=datas)
			#print(res.text)
		elif msgDecode[0:7] =='tobacco' :
			if (currentTime - tobaccoTime) >= 3 : 
				tobaccoTime = currentTime
				detectCount = int(msgDecode[7:8])
			else :
				if (int(msgDecode[7:8]) > detectCount) and abs(tobaccoTime - smokeTime) < 3 :
					transTime = currentTime
					detectCount = int(msgDecode[7:8])
					fileName = id+str(time.time())+'.jpg'
					#transTime = currentTime
					#cv2.imwrite(fileName,temp)
					#files = {'file':open(fileName,'rb')}	
					#res = requests.post(url,files=files,data=datas)
					#print(res.text) 
					#alert.play()
				elif (abs(tobaccoTime - smokeTime) < 3) and (abs(transTime - currentTime) > 3) :
					transTime = currentTime
					detectCount = int(msgDecode[7:8])
					fileName = id+str(time.time())+'.jpg'
					#transTime = currentTime
					#cv2.imwrite(fileName,temp)
					#files = {'file':open(fileName,'rb')}	
					#res = requests.post(url,files=files,data=datas)
					#print(res.text) 
					#alert.play()
				
				#test
				elif abs(transTime - currentTime) > 3 : 
					transTime = currentTime
					alert.play()
					print('transmission')
				#test
					
		elif msgDecode =='smoke' :
			if (currentTime - smokeTime) >= 3 : 
				smokeTime = currentTime
			else :
				if abs(tobaccoTime - smokeTime) < 3 and (abs(transTime - currentTime) > 3) :
					transTime = currentTime
					fileName = id+str(time.time())+'.jpg'
					#cv2.imwrite(fileName,temp)
					#files = {'file':open(fileName,'rb')}	
					#res = requests.post(url,files=files,data=datas)
					#print(res.text)
			
		ret, img = cam.read()
		cv2.imshow("Test",img)
		cv2.waitKey(1)
		temp = img

		result, img = cv2.imencode('.jpg', img, encode_param)
		data = np.array(img)
		stringData = data.tostring();
		s.sendall((str(len(stringData))).encode().ljust(16) + stringData)
	
	except KeyboardInterrupt:
		s.close()
		sys.exit()
