# Getting started with the DeepFace API

This project was created with the [DeepFace API](https://github.com/serengil/deepface)

## What is DeepFace

Deepface is a facial recognition framework for Python. DeepFace allows one to conduct facial analysis on a face, where DeepFace would detail the age, gender, emotion, and race based off the face given to DeepFace.

## Installation

To install DeepFace, RUN the command "pip install deepface".

For other installation methods, refer to these [instructions](https://github.com/serengil/deepface).

## Learn More

To learn more about DeepFace and the functionalities within DeepFace, refer to this [GitHub](https://github.com/serengil/deepface).

To have a video rundown of DeepFace, refer to this [video](https://www.youtube.com/watch?v=WnUVYQP4h44&ab_channel=SefikIlkinSerengil).

# Getting Started with Docker

This project utilizies the software platform [Docker](https://www.docker.com/)

## Running Docker Without the Service

In order to run the build without the service, it is necessary to first create the Dockerfile. To do that, in a new file, write

```
FROM python:3.8

RUN pip install deepface

RUN apt-get update && \
    apt-get install ffmpeg libsm6 libxext6 -y

RUN pip install flask_cors

COPY . deepface
```

After creating this new file, in the terminal, run the command

```
docker run --detach --name JACL IMAGE -f /dev/null

docker build --tag myJACL-fm .

docker run --detach --name JACL myJACL-fpm
```

In this command, **IMAGE** is the specific image you want to run into the container.

After completing these commands, you should be able to run the container with the image.

## Running Docker with the Service

One way to run Docker with a program is to write the command below within the terminal

```
docker run --hostname author jackl_venture
```

Another way to open a Docker container is to open the specific containers within the Docker app while running a program.
