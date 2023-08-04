import React, { FormEvent, useEffect, useState, useRef } from "react";
import { convertImgToBase64String } from "../../utils/utils";
import { FindFaceDetails } from "../../types/Types";

// URL to the find function
const FINDING_FACE_URL = "http://localhost:8000/find";

// On Click Function
export const FindFace = () => {
  const [imgFind, setImgFind] = useState("");
  const [findData, setFindData] = useState<FindFaceDetails[] | undefined>(
    undefined
  );
  const isMounted = useRef(false);

  const uploadImageCallback = (
    event: FormEvent<HTMLInputElement> | undefined
  ): void => {
    convertImgToBase64String(event, setImgFind);
  };

  useEffect(() => {
    // Check if component is mounted
    if (isMounted.current) {
      // Send POST request to FIND URL
      fetch(FINDING_FACE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ img: imgFind }),
      })
        .then((response) => response.json())
        .then((data: FindFaceDetails[]) => {
          // Set the state with the response data
          setFindData({
            ...data,
          });
        })
        // Console if there is an error
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      isMounted.current = true;
    }
  }, [imgFind]);

  return (
    <>
      <input onInput={uploadImageCallback} type="file" />
      {findData && (
        <div>
          <img src={imgFind}></img>
          <p>{`Closest Distance: ${findData[0].distance}`}</p>
          <img src={findData[0].image}></img>

          <p>{`Second Distance: ${findData[1].distance}`}</p>
          <img src={findData[1].image}></img>

          <p>{`Third Distance: ${findData[2].distance}`}</p>
          <img src={findData[2].image}></img>
        </div>
      )}
    </>
  );
};
