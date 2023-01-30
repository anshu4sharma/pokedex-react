import React, { useState } from "react";
import PokemonModal from "./PokemonModal";

const PokemonCard = ({ id, name, type, data }) => {
  const [show, setShow] = useState(false);
  const style = type + " thumb-container";
  let image = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`

  return (
    <>
      {show ? (
        <PokemonModal
          image={image}
          type={type}
          name={name}
          id={id}
          data={data}
          show={show}
          setShow={setShow}
        />
      ) : (
        <div onClick={() => setShow(true)} className={style}>
          <img loading="lazy" src={image} alt={name} />
          <div className="detail-wrapper">
            <h4>{name}</h4>
            <div className="number">
              <small>#0{id}</small>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonCard;
