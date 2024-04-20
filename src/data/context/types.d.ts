export type PokemonBaseInfo = {
  name: string,
  url: string
}

export type DataPokeon = {
  results: PokemonBaseInfo[],
}

export type ProviderContexProps = {
  children: ReactNode
}

export interface IContextPage {
  pokemonPage: DataPokeon,
  pokemonFilter: DataPokeon,
  isLoading: boolean,
  allPokeons: DataPokeon,
  setPage: (page: number) => void,
  setLimit: (limit: number) => void,
  setPokemonPage: (_page: DataPokeon) => void,
  setPokenFilter: (pkm: DataPokeon) => void,
  setTeam: (pkm: DataPokeon) => void,
  team: DataPokeon
}