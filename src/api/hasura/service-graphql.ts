import axios from "axios"
import { PokemonBaseInfo } from "../../data/context/types"

const graphqlEndpoint = 'http://localhost:8080/v1/graphql' // wip .env

export const getStoragePokemon = async () => {
  const graphqlMutation = `
  query GetTeam {
    team {
      id
      name
      url
    }
  }
  `
  const response = await axios.post(graphqlEndpoint, {
    query: graphqlMutation
  })
  return response.data.data?.team || [] // fallback
}

export const savePokemonInStorage = async (data: PokemonBaseInfo) => {
  const graphqlMutation = `
  mutation SavePkm($name: String!, $url: String!) {
    insert_team(objects: {name: $name, url: $url}) {
      returning {
        name
        url
      }
    }
  }
`;
  return await axios.post(graphqlEndpoint, {
    query: graphqlMutation,
    variables: {
      name: data.name,
      url: data.url
    }
  });
}

export const DeletePokemonInStorage = async (url: string) => {
  const graphqlMutation = `
  mutation deletePokemon($url: String!) {
    delete_team(where: {url: {_eq: $url}}) {
      affected_rows
    }
  }
  `
  return await axios.post(graphqlEndpoint, {
    query: graphqlMutation,
    variables: {
      url: url
    }
  });
}
