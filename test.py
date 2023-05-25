import cv2
import dlib

# Load the face image
face_image = cv2.imread('path_to_face_image.jpg')

# Create a cascade classifier for face detection
face_cascade = cv2.CascadeClassifier('path_to_face_cascade.xml')

# Create a dlib shape predictor for facial landmark detection
shape_predictor = dlib.shape_predictor('path_to_shape_predictor.dat')

# Convert the image to grayscale
gray_image = cv2.cvtColor(face_image, cv2.COLOR_BGR2GRAY)

# Perform face detection
faces = face_cascade.detectMultiScale(gray_image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

# Iterate over the detected faces
for (x, y, w, h) in faces:
    # Extract the region of interest (face) from the image
    face_roi = face_image[y:y+h, x:x+w]

    # Convert the face ROI to grayscale
    gray_roi = cv2.cvtColor(face_roi, cv2.COLOR_BGR2GRAY)

    # Perform facial landmark detection
    landmarks = shape_predictor(gray_roi, dlib.rectangle(0, 0, w, h))

    # Extract hairline coordinates (example using a specific index)
    hairline_x = landmarks.part(0).x
    hairline_y = landmarks.part(0).y

    # Draw a circle at the hairline position
    cv2.circle(face_roi, (hairline_x, hairline_y), 5, (0, 255, 0), -1)

    # Overlay the modified face ROI back onto the original image
    face_image[y:y+h, x:x+w] = face_roi

# Display the result
cv2.imshow('Hair Wig Simulation', face_image)
cv2.waitKey(0)
cv2.destroyAllWindows()
