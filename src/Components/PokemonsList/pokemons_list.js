import React from "react";
import PokemonCard from "../PokemonCard/pokemon_card";

function PokemonsList(props) {
  let pokemonsList = props.pokemonslist;
  const filterText = props.filtertext;

  pokemonsList.sort((a, b) => a.id - b.id);

  function filterList(filterText) {
    const filteredPokemonsList = [];
    pokemonsList.forEach((pokemon) => {
      if (pokemon.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1)
        filteredPokemonsList.push(pokemon);
    });
    return filteredPokemonsList;
  }

  if (filterText !== "") {
    pokemonsList = filterList(filterText);
  }

  return (
    <div className="row">
      {pokemonsList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          img={pokemon.img}
          name={pokemon.name}
        />
      ))}
    </div>
  );
}

export default PokemonsList;
