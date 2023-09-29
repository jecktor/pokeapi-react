import type { Pokemon } from '../types';

export async function getPokemons(from: number, to: number) {
  const pokemons: Pokemon[] = [];

  for (let i = from; i <= to; ++i) {
    pokemons.push(await getPokemon(i.toString()));
  }

  return pokemons;
}

export async function getPokemon(query: string): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
  const data = res.json();

  return data;
}

export function getPokemonColor(type: string) {
  interface TypeColor {
    [key: string]: string;
  }

  const typeColor: TypeColor = {
    normal: 'bg-gray-400',
    fire: 'bg-red-400',
    water: 'bg-blue-400',
    grass: 'bg-green-400',
    electric: 'bg-yellow-400',
    ice: 'bg-blue-200',
    fighting: 'bg-red-600',
    poison: 'bg-purple-400',
    ground: 'bg-yellow-600',
    flying: 'bg-blue-300',
    psychic: 'bg-purple-600',
    bug: 'bg-green-600',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-800',
    dark: 'bg-gray-800',
    dragon: 'bg-red-800',
    steel: 'bg-gray-600',
    fairy: 'bg-pink-400',
  };

  return typeColor[type];
}
