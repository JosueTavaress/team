import { IPropsCard, ICardData } from "./types"
import "./syles.css"
import { useEffect, useState } from "react"
import { getDetailsPokemon } from "../../api/pokeapi/service-pokemon"

const Card = ({ prop, ButtonCustom }: IPropsCard) => {
  const [cardData, setCardData] = useState<ICardData>()
  const { name, url } = prop


  useEffect(() => {
    const getDataPokemon = async (url: string) => {
      const details = await getDetailsPokemon(url)
      const { front_default } = details.data.sprites.other.home
      const { types } = details.data
      setCardData({ details: [...types], image: front_default })
    }
    getDataPokemon(url)
  }, [])

  return (
    <div className="card">
      <img className="cardImg" src={cardData?.image} alt={`Imagem do ${name}`} />
      <h3 className="cardTitle">{name}</h3>
      <p className="cardType">{cardData?.details[0].type.name}</p>
      {ButtonCustom}
    </div>
  )
}

export default Card