import { FormEvent, useState } from 'react';
import { useLocation } from 'wouter';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const setLocation = useLocation()[1];

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLocation(`/pokemon/${search.toLocaleLowerCase()}`);
  }

  return (
    <div className="w-4/5 mx-auto my-10">
      <form onSubmit={e => handleSubmit(e)}>
        <input
          className="w-full px-4 py-2 text-2xl border-2 border-gray-300 rounded-full focus:outline-none focus:border-gray-500"
          type="text"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
}
