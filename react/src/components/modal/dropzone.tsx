import { findByPlaceholderText } from "@testing-library/react";
import React, { Dispatch, FunctionComponent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import folder from "./dropzone_img/folder.png";
import "./dropzone.css";

const Dropzone = ({setFile}: {setFile:(f:File[])=> void}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles);
  }, []);

// interface Props {
//  acceptedFiles: File[],
//  setFile: (f: File) => void,
// }


//   const Dropzone = ({setFile}: {setFile:(f:File[])=> void}) => {
//     const onDrop = useCallback((acceptedFiles: File[]) => {
//       const mappedAcc = acceptedFiles.map(file => ({file }));
      
//       setFile((acceptedFiles) => [...acceptedFiles, ...mappedAcc]);
//     }, []);


  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: true,
      accept: {
        "image/*": [".png", ".jpeg", ".jpg"],
      },
    });


  return (
    <div className="p-4">
      <div {...getRootProps()} className="drag_drop">
        <input {...getInputProps()}></input>

        <div className="box-drag_drop">

          <img src={folder} alt="folder" className="h-4 w-4" />

          {isDragReject ? (
            <p>Sorry, this format is not accepted</p>
          ) : (
            <div>
              <p>Drag and Drop Files Here </p>
              <p className="onlyJpegPngText">Only jpeg and png </p>
            </div>
          )}
        </div>
      </div>
    </div>


  );
};

export default Dropzone;
