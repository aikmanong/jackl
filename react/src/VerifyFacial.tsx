import React, { FormEvent, useEffect, useState } from "react";
import { convertImgToBase64String } from "./utils";
import { FacialDetails } from "./Types";

const defaultFaceInfo: FacialDetails = {
  verified: undefined,
  distance: 0,
  max_thresh_hold: 0,
  model: undefined,
  similarity_metric: undefined,
};

const VERIFY_POST_URL = "http://127.0.0.1:8000/verify";

export const FaceFeatures = () => {
  const [firstImg, setFirstImg] = useState("");
  const [secondImg, setSecondImg] = useState("");

  const uploadFirstImgCallback = (
    event: FormEvent<HTMLInputElement> | undefined
  ): void => {
    convertImgToBase64String(event, setFirstImg);
  };

  const uploadSecondImgCallback = (
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
          img: [
            { img1: firstImg, img2: secondImg },
            { img1: firstImg, img2: secondImg },
            { img1: firstImg, img2: secondImg },
          ],
        }),
      }).then(() => {
        console.log("fetch callback");
      });
    }
  }, [firstImg, secondImg]);

  return (
    <>
      <input onInput={uploadFirstImgCallback} type={"file"} />
      <input onInput={uploadSecondImgCallback} type={"file"} />
    </>
  );
};
