import * as React from 'react';
import {useState}  from 'react';
import { textSpanIntersectsWithPosition } from 'typescript';
import "../modal/modal.css";
import Face_display from './facedisplay';

export default function Modal({onImageSelect}) {
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
            <Face_display  onClick={onImageSelect}/>
            <button className="close-modal" onClick={toggleModal}> CLOSE </button>
          </div>
       </div>
        )}
         


      </div>
    );
  }
