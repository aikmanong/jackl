import * as React from "react";
import { useState } from "react";
import Modal from "./modal/modal";
import { Celebrity } from "./modal/facedisplay";
import { celebrities } from "./modal/facedisplay";

export default function FirstComponent() {
  // const [changePhoto, setChangePhoto] = useState("");
  const [celeb, setCeleb] = useState<Celebrity>(celebrities[0]);

  const handleClick = (celebrity: Celebrity) => {
    console.log(celebrity.id);
    setCeleb(celebrity);
    console.log("Image clicked");
  };

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
