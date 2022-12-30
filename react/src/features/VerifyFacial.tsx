import React, { FormEvent, useEffect, useState } from "react";
import { convertImgToBase64String } from "../utils";
import { FacialDetails } from "../Types";

const defaultFaceInfo: FacialDetails = {
  verified: "",
};

const VERIFY_POST_URL = "http://127.0.0.1:8000/verify";

export const FaceFeatures = () => {
  let imgStyles;
  const [firstImg, setFirstImg] = useState("");
  const [secondImg, setSecondImg] = useState("");
  const [faceCompare, setFaceData] = useState(defaultFaceInfo);

  if (firstImg && secondImg) {
    if (`${faceCompare.verified}` == "true") {
      imgStyles = {
        border: "5px solid rgba(0, 256, 0, 0.75)",
        width: "500px",
        height: "500px",
      };
    } else {
      imgStyles = {
        border: "5px solid rgba(256, 0, 0, 0.75)",
        width: "500px",
        height: "500px",
      };
    }
  }

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
        <img style={imgStyles} src={firstImg}></img>
        <img style={imgStyles} src={secondImg}></img>

        <p>{`Same person? ${faceCompare.verified}`}</p>
      </div>
    </>
  );
};
