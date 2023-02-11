import * as React from 'react';
import {useState, useEffect}  from 'react';
import Dropzone from "../modal/dropzone";

//celebrity with "export" can be imported
//C in celeb is capital bc it's a custom type and complex type ( not primitive (object))
export interface Celebrity  {
    id: number
    img: string
    text: string
}



//prevents strings, incomplete objects in the array
export const celebrities: Celebrity[]= [
  { "id": 1,
      "img": "https://assets.vogue.com/photos/6226846b921b9eb00286c6ea/master/pass/GettyImages-77731940.jpg",
      "text": "Will Smith"
    },
    { "id": 2,
    "img": "https://cdn.thehollywoodgossip.com/uploads/2015/09/lebron-james.jpg",
    "text": "Lebron James"
     },
     { "id": 3,
    "img": "https://www.boredpanda.com/blog/wp-content/uploads/2018/08/nicest-celebrity-encounters-101-5b7bd05e94295__700.jpg",
    "text": "Robin Williams"
     },
     { "id": 4,
    "img": "https://i2-prod.mirror.co.uk/incoming/article25219228.ece/ALTERNATES/s1200b/0_EHP_CHP_141021Gordon-Ramsay-_58659.jpg",
    "text": "Gordan Ramsay"
     }
]

interface Props {
  //()=> void specify the function and what it will return, void means no return value
  onClick: (celebrity: Celebrity)=> void ;
}

export default function FaceDisplay({onClick}:Props) {
const [file, setFile] = useState<File|null>(null);
const [preview, setPreview] = useState<string|null>(null)


useEffect(()=> { //run when [file] changes
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    setPreview(reader.result as string);
  }, false);

  if(file) {
    reader.readAsDataURL(file);
  }

}, [file])
//set the reult of the reader as my preview value


    return (
      
      <table>
        {celebrities.map((celeb) => 
          <tbody key={celeb.id}>
              <tr>
                <td><button onClick={()=> onClick(celeb)}><img src={celeb.img} alt={celeb.text} height="100px"/></button></td>
                <td>{celeb.text}</td>
                
              </tr>
          
           </tbody>
            
          )}
           <button>{preview===null? "" : <img className="uploadedImg" src ={preview}/>} </button>
           {file?.name}
           <Dropzone  setFile={setFile}/>
      </table>

    );
  }

