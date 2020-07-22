import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App/App";
import * as serviceWorker from "./serviceWorker";

// Fetching pokemons urls
const pokeUrls = fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
  .then((response) => response.json())
  // Keeping only the pokemons url
  .then((jsonData) => {
    const pokeUrls = jsonData.results;
    // Trim all the data to keep the url
    return pokeUrls.map((pokeUrls) => pokeUrls.url);
  })
  .catch((error) => {
    console.log(`Error while fetching pokemons urls: ${error}`);
  });

// Once data retrieved, load pokemons array
const pokemonsArray = pokeUrls.then((urlsArray) => {
  // Devuelvo una promesa con todas las promesas generadas en el forEach
  return Promise.all(
    urlsArray.map((url) => {
      return (
        fetch(url)
          // Parsing into json
          .then((response) => response.json())
          // Keeping only the needed data
          .then((pokeData) => {
            const pokeobj = {
              id: pokeData.id,
              name: pokeData.name,
              types: pokeData.types.map((value) => value.type.name),
              img: `https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`,
            };
            return pokeobj;
          })
          .catch((error) => {
            console.log(`Error while fetching each pokemons: ${error}`);
          })
      );
    })
  );
});

// After having the data, load the app
pokemonsArray.then((pokemons) => {
  console.log({ pokemons });
  ReactDOM.render(
    <React.StrictMode>
      <App pokemons={pokemons} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});

serviceWorker.unregister();
