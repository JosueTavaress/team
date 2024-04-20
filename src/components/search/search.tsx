import React, { useState, useContext } from 'react'
import "./style.css"
import { PokemonContext } from "../../data/context/pokemons"
import { ISearchBarProps, IFilter } from './types'
import { PokemonBaseInfo } from '../../data/context/types'

const SearchBar: React.FC<ISearchBarProps> = ({ placeholder = "Pesquisar..." }) => {
  const [query, setQuery] = useState<Readonly<string>>('')
  const { setPokenFilter, allPokeons } = useContext(PokemonContext)
  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(value)
  };

  const handleSubmit = () => {
    if (query.trim()) {
      const filter: PokemonBaseInfo[] = allPokeons.results.filter((el: IFilter) => el.name.includes(query))
      setPokenFilter({
        results: filter
      })
    }
  }

  const handleClearFilter = () => {
    setPokenFilter({
      results: []
    });
    setQuery("")
  }

  return (
    <div className="searchForm">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="searchInput"
      />
      <button onClick={handleSubmit} className="searchButton">
        Pesquisar
      </button>
      <button onClick={handleClearFilter} className="searchButton">
        Limpar filtro
      </button>
    </div>
  );
};

export default SearchBar;
