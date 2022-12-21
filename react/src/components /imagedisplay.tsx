import * as React from "react";
import {useState}  from 'react';
import Modal from "./modal/modal";


export default function FirstComponent () {

  // const [changePhoto, setChangePhoto] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleClick = (celebrity) => {
    console.log(celebrity);
    setPhoto(celebrity)
    console.log('Image clicked');
  };

      return (
        <div>
          
          <h3>{photo.text}</h3>
          <img src={photo.img} alt="image" width = "200px" height= "300px"
            />
          <br></br>
          <Modal onImageSelect={handleClick}/>
         
        </div>
      );
    
  }