import React, { useState } from "react";
import "./App.css";
import PokemonsList from "../PokemonsList/pokemons_list";
import SearchBar from "../SearchBar/search_bar";

function App(props) {
  const pokemons = props.pokemons;
  const [filterText, setFilterText] = useState("");

  // Cargo la pokedex
  return (
    <div className="container-fluid">
      <SearchBar
        filtertext={filterText}
        onInputChange={(text) => setFilterText(text)}
      />
      <PokemonsList pokemonslist={pokemons} filtertext={filterText} />
    </div>
  );
}

export default App;
