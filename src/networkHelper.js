export default class networkHelper {
  fetchData = async () => {
    try {
      let pokemonsUrls = await fetchPokemonsUrls(
        "https://pokeapi.co/api/v2/pokemon/?limit=151"
      );

      // Looping through all urls to get the data
      let pokemonsList = [];
      await pokemonsUrls.forEach(async (url) => {
        let pokemon = await fetchPokemon(url);
        pokemonsList.push(pokemon);
      });
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

  // Fetches the needed info for creating a pokemon object
  // returns a Pokemon object.
  fetchPokemon = async (pokeUrl) => {
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
  };

  // Fetches all the pokemon urls which contain the needed data
  // returns an array of urls.
  fetchPokemonsUrls = async (apiUrl) => {
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
  };
}
