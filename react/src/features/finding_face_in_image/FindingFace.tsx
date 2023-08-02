import React, { FormEvent, useEffect, useState, useRef } from "react";
import { convertImgToBase64String } from "../../utils/utils";
import { FindFaceDetails } from "../../types/Types";

// Default distance
const defaultFindData: FindFaceDetails = {
  first_distance: 0,
  first_image: "",
  second_distance: 0,
  second_image: "",
  third_distance: 0,
  third_image: "",
};

// URL to the find function
const FINDING_FACE_URL = "http://localhost:8000/find";

// On Click Function
export const FindFace = () => {
  const [imgFind, setImgFind] = useState("");
  const [findData, setFindData] = useState(defaultFindData);
  const isMounted = useRef(false);

  const uploadImageCallback = (
    event: FormEvent<HTMLInputElement> | undefined
  ): void => {
    convertImgToBase64String(event, setImgFind);
  };

  // Format the image URL to include "file:///"
  const formatImageUrl = (url: string): string => {
    if (url.startsWith("/")) {
      url = "file://" + url.replace(/\\/g, "/");
    }
    return url;
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
        .then((data) => {
          console.log(data); // Check the response data in the console
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

  console.log("findData:", findData);

  return (
    <>
      <input onInput={uploadImageCallback} type="file" />
      <div>
        <img src={imgFind}></img>
        <p>{`Closest Distance: ${findData.first_distance}`}</p>
        <img src={findData.first_image}></img>

        <p>{`Second Distance: ${findData.second_distance}`}</p>
        <img src={findData.second_image}></img>

        <p>{`Third Distance: ${findData.third_distance}`}</p>
        <img src={findData.third_image}></img>
      </div>
    </>
  );
};
