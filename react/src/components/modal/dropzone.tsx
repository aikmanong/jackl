import { findByPlaceholderText } from "@testing-library/react";
import React, { Dispatch, FunctionComponent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import folder from "./dropzone_img/folder.png";
import "./dropzone.css";

const Dropzone = ({setFile}: {setFile:(f:File)=> void}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "image/*": [".png", ".jpeg", ".jpg"],
      },
    });

  return (
    <div className="p-4">
      <div {...getRootProps()} className="drag_drop">
        <input {...getInputProps()}></input>

        <div className="box-drag_drop">

        {/* <div className={"box-drag_drop"
          + (isDragReject === true ? "border-red-500": "")
          + (isDragAccept === true ? "border-green-500": "")
  }> */}
          <img src={folder} alt="folder" className="h-4 w-4" />

          {isDragReject ? (
            <p>Sorry, this format is not accepted</p>
          ) : (
            <div>
              <p>Drag and Drop Files Here </p>
              <p className="mt-2 text base text-gray-300">Only jpeg and png </p>
            </div>
          )}
        </div>
      </div>
    </div>

    // <div className="p-4">
    //   <div {...getRootProps()}>
    //     <input {...getInputProps()} />
    //     <div>
    //       <img src={folder} alt="folder" className="h-16 w-16" />

    //       {isDragReject ? (
    //         <p>Sorry, this format is not accepted</p>
    //       ) : (
    //         <div>
    //           <p>Drag and Drop Files Here </p>
    //           <p className="mt-2 text base text-gray-300">Only jpeg and png </p>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Dropzone;
