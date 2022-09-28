import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const PokemonThumb = ({ id, image, name, type, _callback }) => {
  const [show, setShow] = useState(false);

  const style = type + " thumb-container";
  const modalStyle = type + " modal-container-img";
  console.log(type);
  return (
    <>
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton></Modal.Header>

        <Modal.Body>
          <div className="container pokemon">
            <div
              closeButon
              onClick={() => setShow(false)}
              className={modalStyle}
            >
              <img src={image} alt={name} />
            </div>
            <div className="pokemon-detail">
              <h2 style={{ textTransform: "uppercase" }}>{name}</h2>
              <div className="vr"></div> <h3>#00{id}</h3>
              <div className="vr"></div>
            </div>
            <div className="">
                <p>Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally. When expelling a blast of super hot fire, the red flame at the tip of its tail burns more intensely. If CHARIZARD be­comes furious, the flame at the tip of its tail flares up in a whitish-blue color. Breathing intense, hot flames, it can melt almost any­ thing. Its breath inflicts terrible pain on enemies . . . read more</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div onClick={() => setShow(true)} className={style}>
        <img src={image} alt={name} />
        <div className="detail-wrapper">
          <h4>{name}</h4>
          <div className="number">
            <small>#0{id}</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonThumb;

// <p>
//                 Spits fire that is hot enough to melt boulders. Known to cause
//                 forest fires unintentionally. When expelling a blast of super
//                 hot fire, the red flame at the tip of its tail burns more
//                 intensely. If CHARIZARD be­comes furious, the flame at the tip
//                 of its tail flares up in a whitish-blue color. Breathing
//                 intense, hot flames, it can melt almost any­ thing. Its breath
//                 inflicts terrible pain on enemies . . . read more
//               </p>
