import React, { FormEvent, useEffect, useState } from "react";
import { convertImgToBase64String } from "../../utils/utils";
import { currentLoadingState, FacialDetails } from "../../types/Types";
import "./VerifyFacial.css";

const defaultFaceInfo: FacialDetails = {
  verified: "false",
};

const VERIFY_POST_URL = "http://localhost:8000/verify";

export const FaceFeatures = () => {
  const [firstImg, setFirstImg] = useState("");
  const [secondImg, setSecondImg] = useState("");
  const [facialComparisonData, setFacialComparisonData] =
    useState(defaultFaceInfo);
  const [loadingState, setLoadingState] =
    useState<currentLoadingState>("not-loading");

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
      setLoadingState("loading");
      fetch(VERIFY_POST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model_name: "VGG-Face",
          img: [{ img1: firstImg, img2: secondImg }],
        }),
      })
        .then((response) => {
          if (!response.ok) {
            setLoadingState("loading-error");
            console.error(`${response.status} status - ${response.statusText}`);
          } else {
            response.json().then((data) => {
              const facialComparisonData = data.pair_1 as FacialDetails;
              facialComparisonData.verified
                ? setLoadingState("verified")
                : setLoadingState("not-verified");

              setFacialComparisonData(facialComparisonData);
            });
          }
        })
        .catch((error) => {
          setLoadingState("loading-error");
          console.error(
            "Couldn't correctly compare the two images, unusual error",
            error
          );
        });
    }
  }, [firstImg, secondImg]);

  return (
    <>
      <input onInput={uploadImgCallback} type={"file"} />
      <input onInput={uploadImgCallback2} type={"file"} />
      {firstImg && secondImg && (
        <div className={`verify-facial-image-container ${loadingState}`}>
          <img src={firstImg}></img>
          <img src={secondImg}></img>
          {loadingState === "loading" && <p>loading...</p>}
          {(loadingState === "verified" || loadingState === "not-verified") && (
            <p>{`Same person? ${facialComparisonData.verified}`}</p>
          )}
          {loadingState === "loading-error" && <p>loading error</p>}
        </div>
      )}
    </>
  );
};
