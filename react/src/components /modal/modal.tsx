import * as React from 'react';
import {useState}  from 'react';
import "../modal/modal.css"

export default function Modal() {
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
            <div className="row">
                <div className="column">
                  <p><img src="https://cdn.thehollywoodgossip.com/uploads/2015/09/lebron-james.jpg" alt="LJ" title="Lebron James" width= "300px"/>Lebron James </p>
                </div>
                <div className="column">
                  <p><img src="https://www.boredpanda.com/blog/wp-content/uploads/2018/08/nicest-celebrity-encounters-101-5b7bd05e94295__700.jpg" alt="RW" width= "300px"/>Robin Williams</p>
                </div>
                <div className="column">
                 <p> <img src="https://i2-prod.mirror.co.uk/incoming/article25219228.ece/ALTERNATES/s1200b/0_EHP_CHP_141021Gordon-Ramsay-_58659.jpg" alt="GR" width= "300px"/>Gordan Ramsay</p>
                </div>
            </div>
            <button className="close-modal" onClick={toggleModal}> CLOSE </button>
          </div>
       </div>
        )}
         


      </div>
    );
  }
