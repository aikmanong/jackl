# Getting started with the DeepFace API

This project was created with the [DeepFace API](https://github.com/serengil/deepface)

## What is DeepFace

Deepface is a facial recognition framework for Python. DeepFace allows one to conduct facial analysis on a face, where DeepFace would detail the age, gender, emotion, and race based off the face given to DeepFace.

## Learn More

To learn more about DeepFace and the functionalities within DeepFace, refer to this [GitHub](https://github.com/serengil/deepface).

To have a video rundown of DeepFace, refer to this [video](https://www.youtube.com/watch?v=WnUVYQP4h44&ab_channel=SefikIlkinSerengil).

## Running with Docker

To run the application with Docker, run these commands in the terminal

```bash
docker build --tag deepface-server .

docker run -it -d --name deepface deepface-server python /deepface/api.py
```

The DeepFace server is now operational and is acessible by the default port of 8000.
