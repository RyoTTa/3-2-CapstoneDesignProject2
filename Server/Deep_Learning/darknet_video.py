from ctypes import *
import math
import random
import os
import cv2
import numpy as np
import time
import darknet
import socket
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

def convertBack(x, y, w, h):
    xmin = int(round(x - (w / 2)))
    xmax = int(round(x + (w / 2)))
    ymin = int(round(y - (h / 2)))
    ymax = int(round(y + (h / 2)))
    return xmin, ymin, xmax, ymax


def cvDrawBoxes(detections, img):
    for detection in detections:
        x, y, w, h = detection[2][0],\
            detection[2][1],\
            detection[2][2],\
            detection[2][3]
        xmin, ymin, xmax, ymax = convertBack(
            float(x), float(y), float(w), float(h))
        pt1 = (xmin, ymin)
        pt2 = (xmax, ymax)
        cv2.rectangle(img, pt1, pt2, (0, 255, 0), 1)
        cv2.putText(img,
                    detection[0].decode() +
                    " [" + str(round(detection[1] * 100, 2)) + "]",
                    (pt1[0], pt1[1] - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5,
                    [0, 255, 0], 2)
    return img


netMain = None
metaMain = None
altNames = None


def YOLO():

    global metaMain, netMain, altNames
    configPath = "./yolov4-custom.cfg"
    weightPath = "./yolov4-custom_last.weights"
    metaPath = "./obj.data"
    if not os.path.exists(configPath):
        raise ValueError("Invalid config path `" +
                         os.path.abspath(configPath)+"`")
    if not os.path.exists(weightPath):
        raise ValueError("Invalid weight path `" +
                         os.path.abspath(weightPath)+"`")
    if not os.path.exists(metaPath):
        raise ValueError("Invalid data file path `" +
                         os.path.abspath(metaPath)+"`")
    if netMain is None:
        netMain = darknet.load_net_custom(configPath.encode(
            "ascii"), weightPath.encode("ascii"), 0, 1)  # batch size = 1
    if metaMain is None:
        metaMain = darknet.load_meta(metaPath.encode("ascii"))
    if altNames is None:
        try:
            with open(metaPath) as metaFH:
                metaContents = metaFH.read()
                import re
                match = re.search("names *= *(.*)$", metaContents,
                                  re.IGNORECASE | re.MULTILINE)
                if match:
                    result = match.group(1)
                else:
                    result = None
                try:
                    if os.path.exists(result):
                        with open(result) as namesFH:
                            namesList = namesFH.read().strip().split("\n")
                            altNames = [x.strip() for x in namesList]
                except TypeError:
                    pass
        except Exception:
            pass

    #TCP communication data 

    print("Starting the YOLO loop...")

    # Create an image we reuse for each detect
    darknet_image = darknet.make_image(darknet.network_width(netMain),
                                    darknet.network_height(netMain),3)

    HOST='155.230.28.207'
    PORT=8487

    s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    print('Socket created')

    s.bind((HOST,PORT))
    print('Socket bind complete')

    s.listen()
    print('Socket now listening')

    input_list = [s]

    while True:
        tobaccoCount=0
        smokeCount =0
		
        input_ready, write_ready, except_ready = select.select(input_list, input_list, [])

        for ir in input_ready:
            
            if ir == s:
                conn, addr = s.accept()
                input_list.append(conn)
                print(conn.getpeername(), 'open', flush=True)
                conn.send("activation".encode('utf-8'))
    
            else:
                try : 
                    length = recvall(ir, 16)
                    if length : 
                        stringData = recvall(ir, int(length))
                
                        data = np.fromstring(stringData, dtype = 'uint8')
        
                        frame = cv2.imdecode(data, cv2.IMREAD_COLOR)
                        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

                        prev_time = time.time()
                        frame_read = cv2.imdecode(data, cv2.IMREAD_COLOR)
                        frame_rgb = cv2.cvtColor(frame_read, cv2.COLOR_BGR2RGB)
                        frame_resized = cv2.resize(frame_rgb,
                                   (darknet.network_width(netMain),
                                    darknet.network_height(netMain)),
                                   interpolation=cv2.INTER_LINEAR)

                        darknet.copy_image_from_bytes(darknet_image,frame_resized.tobytes())

                        detections = darknet.detect_image(netMain, metaMain, darknet_image, thresh=0.25)
                        image = cvDrawBoxes(detections, frame_resized)
                        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
						
						
                        for detection in detections :
                               if detection[0].decode() == 'smoking' :
                                    tobaccoCount += 1
                               elif detection[0].decode() == 'smoke' : 
                                    smokeCount += 1
									
                        if tobaccoCount > 0 and smokeCount > 0 :
                            cv2.imshow('Demo', image)
                            cv2.waitKey(3)
                            ir.send(("detection"+str(tobaccoCount)).encode('utf-8'))
                        elif tobaccoCount > 0 and smokeCount == 0 :
                            cv2.imshow('Demo', image)
                            cv2.waitKey(3)
                            ir.send(("tobacco"+str(tobaccoCount)).encode('utf-8'))
                        elif tobaccoCount == 0 and smokeCount > 0 :
                            cv2.imshow('Demo', image)
                            cv2.waitKey(3)
                            ir.send("smoke".encode('utf-8'))
                        else :
                            ir.send("idle".encode('utf-8'))
    
                    else:
                        print(ir.getpeername(), 'close', flush=True)
                        ir.close()
                        input_list.remove(ir)
                except socket.error:
                    #print(ir.getpeername(), 'close', flush=True)
                    #ir.close()
                    input_list.remove(ir)

if __name__ == "__main__":
    YOLO()
