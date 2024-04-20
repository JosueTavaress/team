export interface IPropsCard {
  prop: {
    name: string,
    url: string,
  },
  ButtonCustom: React.ReactNode;
}

export type TypePokemon = {
  type: {
    name: string
  }
}

export interface ICardData {
  image: string,
  details: TypePokemon[]
}