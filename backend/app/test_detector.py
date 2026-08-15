from app.face.detector import detect

image, faces = detect(
    "app/uploads/candidate/candidate.jpg"
)

print(f"Faces Found: {len(faces)}")

for face in faces:
    print(face)