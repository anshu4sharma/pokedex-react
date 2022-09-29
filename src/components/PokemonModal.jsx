import React from "react";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import PokemonStats from "./PokemonStats";
const PokemonModal = ({ data, show, setShow, id, type, name, image }) => {
  const modalStyle = type + " modal-container-img";
  return (
    <>
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <div className="pokemon-detail-header">
            <h2 style={{ textTransform: "uppercase" }}>{name}</h2>
            <h3>#00{id}</h3>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="container pokemon">
            <div onClick={() => setShow(false)} className={modalStyle}>
              <img loading="lazy" src={image} alt={name} />
            </div>
            <div className="details-container">
              <div className="pokemon-detail">
                <h2 style={{ textTransform: "uppercase" }}>{name}</h2>
                <div className="vr"></div> <h3>#00{id}</h3>
                <div className="vr"></div>
                <span
                  onClick={() => setShow(false)}
                  className="material-symbols-outlined"
                >
                  cancel
                </span>
              </div>
              <span>
                Spits fire that is hot enough to melt boulders. Known to cause
                forest fires unintentionally. When expelling a blast of super
                hot fire, the red flame at the tip of its tail burns more
                intensely. If CHARIZARD be­comes furious, the flame at the tip
                of its tail flares up in a whitish-blue color. Breathing
                intense, hot flames, it can melt almost any­ thing.
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
              <div>
                <span>
                  {data.abilities[0]?.ability?.name} ,{" "}
                  {data.abilities[1]?.ability?.name}
                </span>
              </div>
            </div>
            <div>
              <p>Types</p>
              <div>
                <span style={{"display":"inline-flex","gap":"0.5rem"}}>
                  <Badge bg="danger" text="light">
                    {data.types[0].type.name}
                  </Badge>
                  <Badge bg="primary" text="light">
                    {data.types[1]?.type?.name}
                  </Badge>
                </span>
              </div>
            </div>
            {/* To do  data is not avail. currently */}
            {/* <div>
              <p>Weak Against</p>
              <div>
                <Badge bg="danger" text="light">
                  Warning
                </Badge>
              </div>
              <div>
                <Badge bg="success" text="light">
                  Warning
                </Badge>
              </div>
              <div>
                <Badge bg="primary" text="light">
                  Warning
                </Badge>
              </div>
              <div>
                <Badge bg="success" text="light">
                  Warning
                </Badge>
              </div>
              <div>
                <Badge bg="success" text="light">
                  Warning
                </Badge>
              </div>
            </div> */}
          </div>
          <PokemonStats stats={data.stats} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PokemonModal;
