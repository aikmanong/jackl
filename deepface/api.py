import requests
import warnings

import pandas as pd

warnings.filterwarnings("ignore")

#For Find Function
import base64
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

#------------------------------
#from getBase64FromUrl import convert

from flask import Flask, jsonify, request, make_response
from flask_cors import CORS

import argparse
import uuid
import json
import time
from tqdm import tqdm

#------------------------------

import tensorflow as tf
tf_version = int(tf.__version__.split(".")[0])

#------------------------------

if tf_version == 2:
    import logging
    tf.get_logger().setLevel(logging.INFO)

#------------------------------

from deepface import DeepFace

#------------------------------

app = Flask(__name__)
CORS(app) # This will enable CORS for all routes

#------------------------------

if tf_version == 1:
    graph = tf.get_default_graph()

#------------------------------
#Service API Interface

@app.route('/')
def index():
    return '<h1>Hello, BebeS!</h1>'

@app.route('/analyze', methods=['POST'])
def analyze():

    global graph

    tic = time.time()
    req = request.get_json()
    trx_id = uuid.uuid4()

    #---------------------------

    if tf_version == 1:
        with graph.as_default():
            resp_obj = analyzeWrapper(req, trx_id)
    elif tf_version == 2:
        resp_obj = analyzeWrapper(req, trx_id)

    #---------------------------

    toc = time.time()

    resp_obj["trx_id"] = trx_id
    resp_obj["seconds"] = toc-tic

    return resp_obj, 200

def analyzeWrapper(req, trx_id = 0):
    resp_obj = jsonify({'success': False})

    instances = []
    if "img" in list(req.keys()):
        raw_content = req["img"] #list

        for item in raw_content: #item is in type of dict
            instances.append(item)

    if len(instances) == 0:
        return jsonify({'success': False, 'error': 'you must pass at least one img object in your request'}), 205

    print("Analyzing ", len(instances)," instances")

    #---------------------------

    detector_backend = 'opencv'

    actions= ['emotion', 'age', 'gender', 'race']

    if "actions" in list(req.keys()):
        actions = req["actions"]

    if "detector_backend" in list(req.keys()):
        detector_backend = req["detector_backend"]

    #---------------------------

    try:
        resp_obj = DeepFace.analyze(instances, actions = actions)
    except Exception as err:
        print("Exception: ", str(err))
        return jsonify({'success': False, 'error': str(err)}), 205

    #---------------
    #print(resp_obj)
    return resp_obj

@app.route('/verify', methods=['POST'])
def verify():

    global graph

    tic = time.time()
    req = request.get_json()
    trx_id = uuid.uuid4()

    resp_obj = jsonify({'success': False})

    if tf_version == 1:
        with graph.as_default():
            resp_obj = verifyWrapper(req, trx_id)
    elif tf_version == 2:
        resp_obj = verifyWrapper(req, trx_id)

    #--------------------------

    toc =  time.time()

    resp_obj["trx_id"] = trx_id
    resp_obj["seconds"] = toc-tic

    return resp_obj, 200

def verifyWrapper(req, trx_id = 0):

    resp_obj = jsonify({'success': False})

    model_name = "VGG-Face"; distance_metric = "cosine"; detector_backend = "opencv"
    if "model_name" in list(req.keys()):
        model_name = req["model_name"]
    if "distance_metric" in list(req.keys()):
        distance_metric = req["distance_metric"]
    if "detector_backend" in list(req.keys()):
        detector_backend = req["detector_backend"]

    #----------------------

    instances = []
    if "img" in list(req.keys()):
        raw_content = req["img"] #list

        for item in raw_content: #item is in type of dict
            instance = []
            img1 = item["img1"]; img2 = item["img2"]

            validate_img1 = False
            if len(img1) > 11 and img1[0:11] == "data:image/":
                validate_img1 = True

            validate_img2 = False
            if len(img2) > 11 and img2[0:11] == "data:image/":
                validate_img2 = True

            if validate_img1 != True or validate_img2 != True:
                return jsonify({'success': False, 'error': 'you must pass both img1 and img2 as base64 encoded string'}), 205

            instance.append(img1); instance.append(img2)
            instances.append(instance)

    #--------------------------

    if len(instances) == 0:
        return jsonify({'success': False, 'error': 'you must pass at least one img object in your request'}), 205

    print("Input request of ", trx_id, " has ",len(instances)," pairs to verify")

    #--------------------------

    try:
        resp_obj = DeepFace.verify(instances
            , model_name = model_name
            , distance_metric = distance_metric
            , detector_backend = detector_backend
        )

        if model_name == "Ensemble": #issue 198.
            for key in resp_obj: #issue 198.
                resp_obj[key]['verified'] = bool(resp_obj[key]['verified'])

    except Exception as err:
        resp_obj = jsonify({'success': False, 'error': str(err)}), 205

    return resp_obj

@app.route('/represent', methods=['POST'])
def represent():

    global graph

    tic = time.time()
    req = request.get_json()
    trx_id = uuid.uuid4()

    resp_obj = jsonify({'success': False})

    if tf_version == 1:
        with graph.as_default():
            resp_obj = representWrapper(req, trx_id)
    elif tf_version == 2:
        resp_obj = representWrapper(req, trx_id)

    #--------------------------

    toc =  time.time()

    resp_obj["trx_id"] = trx_id
    resp_obj["seconds"] = toc-tic

    return resp_obj, 200

def representWrapper(req, trx_id = 0):

    resp_obj = jsonify({'success': False})

    #-------------------------------------
    #find out model

    model_name = "VGG-Face"; distance_metric = "cosine"; detector_backend = 'opencv'

    if "model_name" in list(req.keys()):
        model_name = req["model_name"]

    if "detector_backend" in list(req.keys()):
        detector_backend = req["detector_backend"]

    #-------------------------------------
    #retrieve images from request

    img = ""
    if "img" in list(req.keys()):
        img = req["img"] #list
        #print("img: ", img)

    validate_img = False
    if len(img) > 11 and img[0:11] == "data:image/":
        validate_img = True

    if validate_img != True:
        print("invalid image passed!")
        return jsonify({'success': False, 'error': 'you must pass img as base64 encoded string'}), 205

    #-------------------------------------
    #call represent function from the interface

    try:

        embedding = DeepFace.represent(img
            , model_name = model_name
            , detector_backend = detector_backend
        )

    except Exception as err:
        print("Exception: ",str(err))
        resp_obj = jsonify({'success': False, 'error': str(err)}), 205

    #-------------------------------------

    #print("embedding is ", len(embedding)," dimensional vector")
    resp_obj = {}
    resp_obj["embedding"] = embedding

    #-------------------------------------

    return resp_obj

#Helper Find Function to Convert Image Path to Base64
def encode_base_64(file_path):
    with open(file_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
        base_64_string = encoded_string.decode("utf-8")
        base_64_string = f"data:image/png;base64,{base_64_string}" 
    return base_64_string

#------------------------- Start Here
@app.route('/find', methods=['POST'])
def find():
    global graph

    tic = time.time()
    req = request.get_json()
    trx_id = uuid.uuid4()

    if tf_version == 1:
        with graph.as_default():
            closest_images = findWrapper(req)
    elif tf_version == 2:
        closest_images = findWrapper(req)

    toc = time.time()

    resp_obj = dict()
    resp_obj["trx_id"] = str(trx_id)
    resp_obj["seconds"] = toc - tic
    # Get the list of closest images and distances from the findWrapper function
    resp_obj["distance_data"] = closest_images

    # Store the distances in the resp_obj dictionary
    if closest_images:
        first_distance = closest_images["closest_distance"][0]
        first_image = closest_images["closest_image"][0]
        second_distance = closest_images["second_distance"][0]
        second_image = closest_images["second_image"][0]
        third_distance = closest_images["third_distance"][0]
        third_image = closest_images["third_image"][0]

    resp_obj["first_distance"] = first_distance
    resp_obj["first_image"] = encode_base_64(first_image)
    resp_obj["second_distance"] = second_distance
    resp_obj["second_image"] = encode_base_64(second_image)
    resp_obj["third_distance"] = third_distance
    resp_obj["third_image"] = encode_base_64(third_image)

    return resp_obj, 200

def findWrapper(req):
    database = '/deepface/database'
    user_img = req.get("img")

    if not isinstance(user_img, str):
        return {"error": "Invalid image path"}, 400

    find_results = DeepFace.find(img_path=user_img, db_path=database)
    df = pd.concat(find_results)

    df.to_csv(r'/deepface/find.csv', sep=' ', mode='w')

    #Finding minimum distance of an image 
    min_distance = df.loc[0, "VGG-Face_cosine"]
    min_image = df.loc[0, "identity"]

    #2nd minimum distance of an image
    sec_min_distance = float('inf')
    sec_min_image = ""
                           
    #3rd minimum distance of an image
    third_min_distance = float('inf')
    third_min_image = ""

    for i in range(1, len(df)):
        distance = df.loc[i, "VGG-Face_cosine"]
        #If distance is less than min_distance, set min_distance to the distance and shift the sec and third min distance
        if distance < min_distance:
            third_min_distance = sec_min_distance
            third_min_image = sec_min_image
            sec_min_distance = min_distance
            sec_min_image = min_image
            min_distance = distance
            min_image = df.loc[i, "identity"]

        #Else If distance is less than second distance, set sec_distance to distance and shift third min 
        elif distance < sec_min_distance:
            third_min_distance = sec_min_distance
            third_min_image = sec_min_image
            sec_min_distance = distance
            sec_min_image = df.loc[i, "identity"]

        #Else If distance is less than third distance, set third_distance to distance  
        elif distance < third_min_distance:
            third_min_distance = distance
            third_min_image = df.loc[i, "identity"]

    #Create dictionary to store all the data 
    distance_data = {
        "closest_distance" : [min_distance],
        "closest_image" : [min_image],
        "second_distance" : [sec_min_distance],
        "second_image" : [sec_min_image],
        "third_distance" : [third_min_distance],
        "third_image" : [third_min_image],
    }

    return distance_data

#------------------------------- End Here 

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '-p', '--port',
        type=int,
        default=5000,
        help='Port of serving api')
    args = parser.parse_args()
    app.run(host='0.0.0.0', port=args.port)