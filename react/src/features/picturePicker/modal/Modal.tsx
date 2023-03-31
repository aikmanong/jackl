import React from "react";
import { useState } from "react";
import "./modal.css";
import { FaceDisplay } from "../FaceDisplay";
import { ICelebrity } from "../FaceDisplay";

interface Props {
  //()=> void specify the function and what it will return, void means no return value
  onImageSelect: (celebrity: ICelebrity) => void;
}

export default function Modal({ onImageSelect }: Props) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <button onClick={toggleModal} className="btn-modal-face-picker">
        {" "}
        Choose..
      </button>

      {modal && (
        <div className="modal-face-picker">
          <div className="overlay-face-picker"></div>
          <div className="modal-content-face-picker">
            <h2>Choose a face</h2>
            <FaceDisplay onClick={onImageSelect} />
            <button className="close-modal-face-picker" onClick={toggleModal}>
              {" "}
              CLOSE{" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
