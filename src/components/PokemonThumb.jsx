import React from 'react'

const PokemonThumb = ({id, image, name, type, _callback }) => {
    const style = type + " thumb-container";
    return (
        <div className={style}>
            <img src={image} alt={name} />
            <div className="detail-wrapper">
                <h3>{name}</h3>
            <div className="number"><small>#0{id}</small></div>
            </div>
        </div>
    )
}

export default PokemonThumb
