import * as React from 'react';
import {useState}  from 'react';
import { textSpanIntersectsWithPosition } from 'typescript';
import "../modal/modal.css";
import FaceDisplay from './facedisplay';
import { Celebrity } from "../modal/facedisplay";

interface Props {
  //()=> void specify the function and what it will return, void means no return value
 onImageSelect: (celebrity: Celebrity)=> void ;
}

export default function Modal({onImageSelect}:Props) {
    const [modal, setModal] = useState(false);


    const toggleModal = () => {
      setModal(!modal)
    }


    return (
      <div>
          <button onClick={toggleModal} className="btn-modal"> Choose..</button>

        {modal && (
          <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h2>Choose a face</h2>
            <FaceDisplay  onClick={onImageSelect}/>
            <button className="close-modal" onClick={toggleModal}> CLOSE </button>
          </div>
       </div>
        )}
         


      </div>
    );
  }
