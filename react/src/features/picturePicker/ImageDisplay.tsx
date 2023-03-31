import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Modal from "./modal/Modal";
import { ICelebrity } from "./FaceDisplay";
import { celebrities } from "./FaceDisplay";

export const ImageDisplay = () => {
  const [celeb, setCeleb] = useState<ICelebrity>(celebrities[0]);
  const [image, setImage] = useState(celebrities[0]);
  const isMounted = useRef(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleClick = (celebrity: ICelebrity) => {
    console.log(celebrity.id, celebrity.img);
    setCeleb(celebrity);
    console.log("Image clicked");
  };

  const ANALYZE_POST_URL = "http://127.0.0.1:8000/verify";

  const urlToBase64 = (url: string) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  useEffect(() => {
    if (isMounted.current) {
      urlToBase64(celeb.img).then((base64) => {
        fetch(ANALYZE_POST_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            img: [
              {
                img1: base64,
                img2: base64,
              },
            ],
          }),
        }).then((response) => {
          response.json().then((data) => {
            setImage(data.instance_1);
          });
        });
      });
    } else {
      isMounted.current = true;
    }
  }, [celeb]);

  useEffect(() => {
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        setPreview(reader.result as string);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <div>
      <div>
        <h3>{celeb.text}</h3>
        <img src={celeb.img} alt="image" width="200px" height="300px" />
      </div>
      <br></br>
      <Modal onImageSelect={handleClick} />
    </div>
  );
};
