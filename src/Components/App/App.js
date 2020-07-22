import React, { useState, useEffect } from "react";
import "./App.css";
import PokemonsList from "../PokemonsList/pokemons_list";
import SearchBar from "../SearchBar/search_bar";

function App() {
  const [pokemonsData, setPokemonsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState("");

  console.log(pokemonsData);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        let pokemonsUrls = await fetchPokemonsUrls(
          "https://pokeapi.co/api/v2/pokemon/?limit=151"
        );

        // Looping through all urls to get the data
        let pokemonsList = [];
        await pokemonsUrls.forEach(async (url) => {
          let pokemon = await fetchPokemon(url);
          pokemonsList.push(pokemon);
        });

        setPokemonsData(pokemonsList);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        return error.message;
      }
    }
    fetchData();
  }, []);

  // Cargo spinner o texto hasta que se dispare useEffect
  if (isLoading) {
    return (
      <div className="container-fluid">
        <SearchBar
          filtertext={filterText}
          onInputChange={(text) => setFilterText(text)}
        />
        <p>Loading ...</p>
      </div>
    );
  }

  // Cargo la pokedex
  return (
    <div className="container-fluid">
      <SearchBar
        filtertext={filterText}
        onInputChange={(text) => setFilterText(text)}
      />
      <PokemonsList pokemonslist={pokemonsData} filtertext={filterText} />
    </div>
  );

  // Fetches the needed info for creating a pokemon object
  // returns a Pokemon object.
  async function fetchPokemon(pokeUrl) {
    try {
      // Fetching pokemon data
      let pokemon = await fetch(pokeUrl)
        // Parsing into json
        .then((rawPoke) => rawPoke.json())
        // Keeping only the needed data
        .then((pokeData) => {
          const pokeobj = {
            id: pokeData.id,
            name: pokeData.name,
            types: pokeData.types.map((value) => value.type.name),
            img: `https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`,
          };
          return pokeobj;
        });
      return pokemon;
    } catch (error) {
      console.log(error.message);
    }
  }

  // Fetches all the pokemon urls which contain the needed data
  // returns an array of urls.
  async function fetchPokemonsUrls(apiUrl) {
    try {
      let pokemonsUrls = await fetch(apiUrl)
        // Parsing the data into json
        .then((rawData) => rawData.json())
        // Keeping only the pokemons data
        .then((jsonData) => jsonData.results)
        // Trim all the data to keep the url
        .then((pokeUrls) => {
          return pokeUrls.map((pokeUrls) => pokeUrls.url);
        });
      return pokemonsUrls;
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default App;
