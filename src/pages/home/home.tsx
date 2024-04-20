import { useContext, useEffect, useState } from "react"
import { PokemonContext } from "../../data/context/pokemons"
import "./home.css"
import Card from "../../components/card/card"
import CardSkaleton from "../../components/card-skaleton/card-skaleton"
import SearchBar from "../../components/search/search"
import ModalTeam from "../../components/modal/modal-team"
import { v4 as uuidv4 } from 'uuid'
import Button from "../../components/button/button"
import { PokemonBaseInfo } from "../../data/context/types"
import { DeletePokemonInStorage, savePokemonInStorage } from "../../api/hasura/service-graphql"

const Home = () => {
  const [list, setList] = useState<Readonly<PokemonBaseInfo[]>>([])
  const [modalOpen, setModalOpen] = useState<Readonly<boolean>>(false);
  const { pokemonPage, isLoading, pokemonFilter, setTeam, team } = useContext(PokemonContext)
  const DEFAULT_LIMIT: number = 20
  const dataSkeleton: null[] = new Array(DEFAULT_LIMIT).fill(null) // 20 itens fake

  useEffect(() => {
    if (pokemonFilter.results.length > 0) {
      setList(pokemonFilter.results)
      return
    }
    setList(pokemonPage.results)
  }, [isLoading, pokemonPage.results, pokemonFilter.results])

  const handleAddToTeam = async (objTeam: PokemonBaseInfo): Promise<void> => {
    const quantityFive: boolean = team.results.length === 5;
    const teamRepeat: boolean = team.results.some((el: PokemonBaseInfo) => el.url === objTeam.url)
    
    if (teamRepeat || quantityFive) return
    await savePokemonInStorage(objTeam)
    setTeam({ results: [...team.results, objTeam] })
  }

  const handlerRemovePokemon = async (objTeam: PokemonBaseInfo): Promise<void> => {
    await DeletePokemonInStorage(objTeam.url)
    const removePkm = team
      .results
      .filter((pkm: PokemonBaseInfo) => pkm.url !== objTeam.url)
    setTeam({ results: removePkm })
  }

  return (
    <>
      <SearchBar />
      <div className="searchForm">
        <button onClick={() => setModalOpen(true)} className="searchButton">
          Visualizar meu time
        </button>
      </div>
      <ModalTeam isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Meu time perfeito">
        {team.results.map((el: PokemonBaseInfo) => (
          <Card
            key={uuidv4()}
            prop={el}
            ButtonCustom={<Button buttonText="Remover do time" onClick={() => handlerRemovePokemon(el)} />} />
        ))}
      </ModalTeam>
      <div className="centeredContainer">
        {isLoading
          ? dataSkeleton.map((_el, idx) => <CardSkaleton key={idx} />)
          : list.map((el: PokemonBaseInfo) => (
            <Card
              key={uuidv4()}
              prop={el}
              ButtonCustom={<Button buttonText="Adicionar ao Time" onClick={() => handleAddToTeam(el)} />} />
          ))}
      </div>
    </>
  )
}

export default Home