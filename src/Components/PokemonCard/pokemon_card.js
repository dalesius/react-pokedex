import React from "react";
import "./pokemon_card.css";

function PokemonCard(props) {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <button className="pokemon-btn" /*onClick={popModal(props)}*/>
        <div className="card">
          <div className="pokemon-card" key={props.id}>
            <div className="poke-number">
              <p>#{props.id}</p>
            </div>
            <div className="img-container">
              <img
                className="card-img-top"
                src={props.img}
                alt={props.name}
              ></img>
            </div>
            <div className="card-body">
              <p className="card-title">{props.name}</p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

export default PokemonCard;
