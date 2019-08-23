import React from "react";
import "../styles/list.css";

const PokemonList = props => {
  const mapTraits = array => {
    return array.join(", ");
  };

  let list = props.stuff.map((pokemon, index) => {
    const { name, num, type, img, weaknesses } = pokemon;
    return (
      <div className="card" key={index}>
        <div className="cardImageContainer">
          <img className="cardImage" src={img} alt={name} />
        </div>
        <div className="cardTextContainer">
          <h2 className="cardName">{name}</h2>
          <div className="cardInfo">
            <p>
              <span>Card: </span>
              {num}
            </p>
            <p>
              <span>Type: </span>
              {mapTraits(type)}
            </p>
            <p>
              <span>Weaknesses: </span>
              {mapTraits(weaknesses)}
            </p>
          </div>
        </div>
      </div>
    );
  });

  return <div className="cardContainer">
            {props.renderList 
              ? list 
              : <div>"No results available with current search and filter settings"</div>
            }
         </div>;
};

export default PokemonList;
