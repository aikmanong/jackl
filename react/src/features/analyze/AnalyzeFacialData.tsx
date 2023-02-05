import React, { FormEvent, useEffect, useRef, useState } from "react";
import { convertImgToBase64String } from "../../utils/utils";
import { IFacialDataProps } from "../../types/Types";
import { Spotify } from "../spotify/Spotify";

const defaultFacialData: IFacialDataProps = {
  age: 0,
  dominant_emotion: undefined,
  gender: undefined,
  dominant_race: undefined,
};

const ANALYZE_POST_URL = "http://localhost:8000/analyze";

export const AnalyzeFacialData = () => {
  const [imgBinaryString, setImgBinaryString] = useState("");
  const [facialData, setFacialData] = useState(defaultFacialData);
  const isMounted = useRef(false);

  const uploadImageCallback = (
    event: FormEvent<HTMLInputElement> | undefined
  ): void => {
    convertImgToBase64String(event, setImgBinaryString);
  };

  useEffect(() => {
    if (isMounted.current) {
      fetch(ANALYZE_POST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ img: [imgBinaryString] }),
      }).then((response) => {
        response.json().then((data) => {
          setFacialData(data.instance_1);
        });
      });
    } else {
      isMounted.current = true;
    }
  }, [imgBinaryString]);

  return (
    <>
      <input onInput={uploadImageCallback} type={"file"} />
      <div>
        <img src={imgBinaryString}></img>
        <p>{`age: ${facialData.age}`}</p>
        <p>{`dominant emotion: ${facialData.dominant_emotion}`}</p>
        <p>{`gender: ${facialData.gender}`}</p>
        <p>{`dominant race: ${facialData.dominant_race}`}</p>
      </div>
      <br />
      <br />
      <br />
      <Spotify emotion={facialData.dominant_emotion} />
    </>
  );
};
