import React, { FormEvent, useEffect, useState } from "react";
import { convertImgToBase64String } from "../utils";
import { FacialDetails } from "../Types";
import "./VerifyFacial.css";

const defaultFaceInfo: FacialDetails = {
  verified: "false",
};

const VERIFY_POST_URL = "http://localhost:8000/verify";

export const FaceFeatures = () => {
  const [firstImg, setFirstImg] = useState("");
  const [secondImg, setSecondImg] = useState("");
  const [faceCompare, setFaceData] = useState(defaultFaceInfo);

  const uploadImgCallback = (
    event: FormEvent<HTMLInputElement> | undefined
  ): void => {
    convertImgToBase64String(event, setFirstImg);
  };

  const uploadImgCallback2 = (
    event: FormEvent<HTMLInputElement> | undefined
  ): void => {
    convertImgToBase64String(event, setSecondImg);
  };

  useEffect(() => {
    if (firstImg && secondImg) {
      fetch(VERIFY_POST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model_name: "VGG-Face",
          img: [{ img1: firstImg, img2: secondImg }],
        }),
      })
        .then((response) => {
          response.json().then((data) => {
            setFaceData(data.pair_1);
          });
        })
        .catch(() => {
          console.log(
            "Couldn't correctly compare the two images, unusual error"
          );
        });
    }
  }, [firstImg, secondImg]);

  return (
    <>
      <input onInput={uploadImgCallback} type={"file"} />
      <input onInput={uploadImgCallback2} type={"file"} />
      <div>
        {firstImg && secondImg &&<img
          className={faceCompare.verified ? "verified" : "not-verified"}
          src={firstImg}
        ></img>}
        {firstImg && secondImg &&<img
          className={faceCompare.verified ? "verified" : "not-verified"} 
          src={secondImg}
        ></img>}
        
        {firstImg && secondImg &&<p>{`Same person? ${faceCompare.verified}`}</p>}
      </div>
    </>
  );
};
