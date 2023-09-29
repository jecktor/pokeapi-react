import { Route } from 'wouter';

import Home from './routes/Home';
import PokemonPage from './routes/PokemonPage';

export default function App() {
  return (
    <>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/pokemon/:id">
        <PokemonPage />
      </Route>
    </>
  );
}
