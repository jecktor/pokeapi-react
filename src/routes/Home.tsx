import { useState, useEffect } from 'react';
import { getPokemons } from '../utils/pokeApi';
import type { Pokemon } from '../types';

import SearchBar from '../components/SearchBar';
import PokeCard from '../components/PokeCard';
import Loading from '../components/Loading';

export default function Home() {
  const [data, setData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pokemonIndex, setPokemonIndex] = useState(1);

  function fetchData() {
    const from = pokemonIndex;
    const to = pokemonIndex + 29;

    if (from >= 1292 || to >= 1292) return;

    setPokemonIndex(to + 1);
    setLoading(true);
    setError('');

    getPokemons(from, to)
      .then(pokemons => setData(pk => [...pk, ...pokemons]))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }

  function handleScroll() {
    if (
      loading ||
      window.innerHeight + window.scrollY < document.body.offsetHeight
    ) {
      return;
    }

    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  if (error || !data) return <div>Error: {error}</div>;

  return (
    <>
      <div className="flex justify-center items-center my-10">
        <img src="/pokedex.png" alt="Pokedex" />
      </div>
      <SearchBar />
      <div className="flex flex-wrap justify-center items-center gap-10 w-4/5 mx-auto">
        {data.map(pokemon => (
          <div className="w-fit h-fit" key={pokemon.id}>
            <PokeCard
              name={pokemon.name}
              image={pokemon.sprites.front_default}
              slug={`/pokemon/${pokemon.id}`}
              type={pokemon.types[0].type.name}
            />
          </div>
        ))}
      </div>
      {loading && <Loading />}
    </>
  );
}
