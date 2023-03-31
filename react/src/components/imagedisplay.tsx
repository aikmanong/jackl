import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Modal from "./modal/modal";
import { Celebrity } from "./modal/facedisplay";
import { celebrities } from "./modal/facedisplay";
// import { convertUrlToBase64 } from "./converturl";
import { resolve } from "node:path/win32";
import { rejects } from "node:assert";
import Dropzone from "./modal/dropzone";

export default function FirstComponent() {
  // const [changePhoto, setChangePhoto] = useState("");
  const [celeb, setCeleb] = useState<Celebrity>(celebrities[0]);
  const [urlTo64, setUrlTo64] = useState("");
  const [image, setImage] = useState(celebrities[0]);
  const isMounted = useRef(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleClick = (celebrity: Celebrity) => {
    console.log(celebrity.id, celebrity.img);
    setCeleb(celebrity);
    console.log("Image clicked");
  };

  // const urlImageCallback = (
  //   event :  FormEvent<HTMLInputElement> | undefined
  // ) : void => {
  //   convertUrlToBase64(event, setUrlTo64);
  // };

  const ANALYZE_POST_URL = "http://127.0.0.1:8000/verify";

  //function signiture and then function call
  const urlToBase64 = (url: string) =>
    fetch(url)
      .then((response) => response.blob())
      //convert image in memory into blob
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            //dataurl converts to base64
            reader.readAsDataURL(blob);
          })
      );

  useEffect(() => {
    if (isMounted.current) {
      urlToBase64(celeb.img).then((base64) => {
        // console.log("Result:", base64);
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
  }, [celeb]); //second argument is depedency array , when ever variable is change then useeffect is triggered

  useEffect(() => {
    //run when [file] changes
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
  //set the reult of the reader as my preview value

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
}
