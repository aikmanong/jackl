import * as React from 'react';

interface Celebrity  {
    id: number
    img: string
    text: string
}

//prevents strings, incomplete objects in the array
const celebrities: Celebrity[]= [
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
     { "id": 3,
    "img": "https://i2-prod.mirror.co.uk/incoming/article25219228.ece/ALTERNATES/s1200b/0_EHP_CHP_141021Gordon-Ramsay-_58659.jpg",
    "text": "Gordan Ramsay"
     }
]

export default function Face_display() {
    
    
    return (
      <div>
        {celebrities.map((celeb) =>   
              <tr>
                <td><img src={celeb.img} alt={celeb.text} height="100px" /></td>
                <td>{celeb.text}</td>
              </tr>
            
            
          )}
        </div>

    );
  }