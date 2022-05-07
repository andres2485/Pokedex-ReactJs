import { useState, useEffect } from "react";
import PokemonThumnail from "./component/PokemonThumnail";

function App() {
  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()
    console.log(data);

    setLoadMore(data.next)

    function createPokemonObject(results) {
      results.forEach(async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()

        setAllPokemons(currentList => [...currentList, data])


      });

    }
    createPokemonObject(data.results)
    await console.log(allPokemons);
  }

  useEffect(() => {
    getAllPokemons()
  }, [])


  return (
    <div className="app-contaner">
      <h1>Pokemon evolution</h1>
      <div className="pokemon-container">
        <div className="all-container">

          {
            allPokemons.map((pokemon, index) => (
              <PokemonThumnail
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.other.dream_world.front_default}
                type={pokemon.types[0].type.name}
                key={index}
              >

              </PokemonThumnail>
            ))
          }
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>Load More</button>
      </div>
    </div>
  );
}

export default App;
