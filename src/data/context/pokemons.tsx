import { createContext, useState, useEffect } from 'react';
import { getPokemons } from '../../api/pokeapi/service-pokemon';
import { IContextPage, DataPokeon, ProviderContexProps } from './types';
import { getStoragePokemon } from '../../api/hasura/service-graphql';

const defaultDataPokemon: DataPokeon = {
  results: []
}

const initialContext: IContextPage = {
  pokemonPage: defaultDataPokemon,
  team: defaultDataPokemon,
  isLoading: true,
  pokemonFilter: defaultDataPokemon,
  allPokeons: defaultDataPokemon,
  setPage: (_page: number) => { },
  setLimit: (_limit: number) => { },
  setPokemonPage: (_page: DataPokeon) => { },
  setPokenFilter: (_page: DataPokeon) => { },
  setTeam: (_page: DataPokeon) => { }
};

export const PokemonContext = createContext<IContextPage>(initialContext)
export const PokemonProvider = ({ children }: ProviderContexProps) => {
  const DEFAULT_PAGE: number = 20
  const DEFAULT_LIMIT: number = 20
  const [limit, setLimit] = useState<Readonly<number>>(DEFAULT_LIMIT)
  const [page, setPage] = useState<Readonly<number>>(DEFAULT_PAGE)
  const [pokemonPage, setPokemonPage] = useState<Readonly<DataPokeon>>(defaultDataPokemon)
  const [allPokeons, setAllPokemons] = useState<Readonly<DataPokeon>>(defaultDataPokemon)
  const [pokemonFilter, setPokenFilter] = useState<Readonly<DataPokeon>>(defaultDataPokemon)
  const [team, setTeam] = useState<Readonly<DataPokeon>>(defaultDataPokemon);
  const [isLoading, setIsLoading] = useState<Readonly<boolean>>(true)

  useEffect(() => {
    const fetchPokemonData = async () => {
      const currentPage = await getPokemons(page, limit) // wip pagination all pokemons
      const allPokeons = await getPokemons(20, 1250)
      const storage = await getStoragePokemon()
      setTeam({ results: storage })
      setPokemonPage(currentPage.data)
      setAllPokemons(allPokeons.data)
      setIsLoading(false)
    };

    fetchPokemonData();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemonPage, isLoading, setPage, setLimit, setPokemonPage, pokemonFilter, setPokenFilter, allPokeons, team, setTeam }}>
      {children}
    </PokemonContext.Provider>
  );
};
