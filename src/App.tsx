import Home from './pages/home/home';
import { PokemonProvider } from "./data/context/pokemons";

function App() {
  return (
    <PokemonProvider>
      <Home />
    </PokemonProvider>
  )
}

export default App
