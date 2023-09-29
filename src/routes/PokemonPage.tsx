import { useRoute } from 'wouter';
import { useFetchData } from '../utils/useFetchData';
import { getPokemon, getPokemonColor } from '../utils/pokeApi';

import Bar from '../components/Bar';
import Loading from '../components/Loading';

export default function PokemonPage() {
  const [match, params] = useRoute('/pokemon/:id');
  const { data, loading, error } = useFetchData(getPokemon, params?.id);

  if (loading) return <Loading />;
  if (!match || error || !data) return <div>Pokemon not found</div>;

  const color = getPokemonColor(data.types[0].type.name);

  return (
    <div>
      <div
        className={`${color} flex flex-col items-center justify-center p-10`}
      >
        <h1 className="text-5xl font-bold text-shadow">
          {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
        </h1>
        <div className="w-80 h-80 z-10">
          <img
            className="pixel w-full h-full"
            src={data.sprites.front_default}
            alt={data.name}
          />
        </div>
      </div>
      <div className="max-w-sm mx-auto py-10">
        <section className="mb-6">
          <h2 className="text-2xl">Stats</h2>
          <ul className="ml-5">
            {data.stats.map(({ base_stat, stat }) => (
              <li key={stat.name}>
                <Bar base_stat={base_stat} stat={stat.name} />
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl">Types</h2>
          <ul className="list-disc ml-10">
            {data.types.map(({ type }) => (
              <li key={type.name}>{type.name}</li>
            ))}
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl">Abilities</h2>
          <ul className="list-disc ml-10">
            {data.abilities.map(({ ability }) => (
              <li key={ability.name}>{ability.name}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
