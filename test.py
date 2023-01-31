import cv2
import numpy as np

# Load the Haar cascade classifier
face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")

# Load the image
img = cv2.imread("wig.png", -1)

# Initialize the video capture
cap = cv2.VideoCapture(0)

# Start a loop to read each frame from the video
while True:
    # Read a frame from the video
    ret, frame = cap.read()

    # Convert the frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect faces
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    # Display the image on each face
    for (x, y, w, h) in faces:
        face_img = cv2.resize(img, (w, h), interpolation = cv2.INTER_CUBIC)
        b,g,r,a = cv2.split(face_img)
        frame_rgba = cv2.cvtColor(frame, cv2.COLOR_BGR2RGBA)
        overlay = cv2.merge((b,g,r,a))
        roi = frame_rgba[y:y+h, x:x+w]
        alpha = np.mean(a) / 255.0
        result = cv2.addWeighted(roi, alpha, overlay, 1 - alpha, 0)
        frame_rgba[y:y+h, x:x+w] = result
        frame = cv2.cvtColor(frame_rgba, cv2.COLOR_RGBA2BGR)

    # Display the resulting frame
    cv2.imshow("Face Detection", frame)

    # Break the loop if the 'q' key is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture and close all windows
cap.release()
cv2.destroyAllWindows()
