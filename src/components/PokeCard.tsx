import { useRef } from 'react';
import { Link } from 'wouter';
import { getPokemonColor } from '../utils/pokeApi';
import { useOnScreen } from '../utils/useOnScreen';

interface Props {
  name: string;
  image: string;
  slug: string;
  type: string;
}

export default function PokeCard({ name, image, slug, type }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const color = getPokemonColor(type);
  const visible = useOnScreen(ref);

  return (
    <div
      ref={ref}
      className={`${color} relative w-52 h-60 rounded-xl shadow-2xl`}
    >
      {visible && (
        <div className="inner-shadow">
          <Link href={slug}>
            <div className="absolute -top-10 -left-14 w-80 h-80 z-10 transition-transform hover:scale-105">
              <img className="pixel w-full h-full" src={image} alt={name} />
            </div>
            <div className="absolute bottom-0 w-full h-full inner-shadow flex items-end rounded-xl">
              <div className="p-3 text-3xl font-bold text-shadow z-20">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
