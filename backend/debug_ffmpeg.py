import os
import shutil
import subprocess

print("Python executable:", shutil.which("python"))
print("FFmpeg executable:", shutil.which("ffmpeg"))

cmd = [
    "ffmpeg",
    "-version",
]

print("Running:", cmd)

result = subprocess.run(
    cmd,
    capture_output=True,
    text=True,
)

print("Return code:", result.returncode)
print("STDOUT:")
print(result.stdout)
print("STDERR:")
print(result.stderr)