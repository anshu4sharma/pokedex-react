import React, { useState } from "react";
import PokemonModal from "./PokemonModal";

const PokemonCard = ({ id, image, name, type, _callback, data }) => {
  const [show, setShow] = useState(false);
  const style = type + " thumb-container";

  return (
    <>
     <PokemonModal image={image} type={type} name={name} id={id} data={data} show={show} setShow={setShow}  />
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

export default PokemonCard;
