import cv2


def crop_face(image, face):

    x, y, w, h = face

    return image[y:y+h, x:x+w]


def resize_face(face):

    return cv2.resize(
        face,
        (160, 160)
    )


def to_gray(face):

    return cv2.cvtColor(
        face,
        cv2.COLOR_BGR2GRAY
    )