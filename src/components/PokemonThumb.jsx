import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";

const PokemonThumb = ({ id, image, name, type, _callback , data}) => {
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
            <div onClick={() => setShow(false)} className={modalStyle}>
              <img src={image} alt={name} />
            </div>
            <div className="details-container">
              <div className="pokemon-detail">
                <h2 style={{ textTransform: "uppercase" }}>{name}</h2>
                <div className="vr"></div> <h3>#00{id}</h3>
                <div className="vr"></div>
                <span
                  onClick={() => setShow(false)}
                  class="material-symbols-outlined">
                  cancel
                </span>
              </div>
              <span>
                Spits fire that is hot enough to melt boulders. Known to cause
                forest fires unintentionally. When expelling a blast of super
                hot fire, the red flame at the tip of its tail burns more
                intensely. If CHARIZARD be­comes furious, the flame at the tip
                of its tail flares up in a whitish-blue color. Breathing
                intense, hot flames, it can melt almost any­ thing. Its breath
                inflicts terrible pain on enemies . . . read more
              </span>
            </div>
          </div>
          <div className="container pokemon-stats">
            <div>
              <p>Height</p>
              <span>{data.height}</span>
            </div>
            <div>
              <p>Weight</p>
              <span>{data.weight}</span>
            </div>
            <div>
              <p>Gender</p>
              <span>Male , Female</span>
            </div>
            <div>
              <p>Egg Groups</p>
              <span>Monster, Dragon</span>
            </div>
          </div>
          <div className="container pokemon-states">
            <div>
              <p>Abilities</p>
              <span>Blaze, Solar-Power</span>
            </div>
            <div>
              <p>Types</p>
              <span>
                <Badge bg="danger" text="light">
                  Warning
                </Badge>
              </span>

              <span>
                <Badge bg="primary" text="light">
                  Warning
                </Badge>
              </span>
            </div>
            <div>
              <p>Weak Against</p>
              <span>
                <Badge bg="danger" text="light">
                  Warning
                </Badge>
              </span>{" "}
              <span>
                <Badge bg="success" text="light">
                  Warning
                </Badge>
              </span>{" "}
              <span>
                <Badge bg="primary" text="light">
                  Warning
                </Badge>
              </span>{" "}
              <span>
                <Badge bg="success" text="light">
                  Warning
                </Badge>
              </span>{" "}
              <span>
                <Badge bg="success" text="light">
                  Warning
                </Badge>
              </span>
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
