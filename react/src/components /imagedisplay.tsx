import * as React from "react";
import Modal from "./modal/modal";


export default class FirstComponent extends React.Component <{}> {
    render() {
      return (
        <div>
          <h3>Will Smith</h3>
          <img src="https://assets.vogue.com/photos/6226846b921b9eb00286c6ea/master/pass/GettyImages-77731940.jpg" alt="image" width = "200px" height= "300px"/>
          <br></br>
          <Modal />
         
        </div>
      );
    }
  }