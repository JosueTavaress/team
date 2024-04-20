import axios from "axios";

const currentVersion = "v2";

const api = axios.create({
  baseURL: `https://pokeapi.co/api/${currentVersion}/`, // wip .env
  headers: {'Content-Type': 'application/json'}
});

const getPokemons = async (page: number, limite: number) => {
  const response = await api.get(`pokemon?offset=${page}&limit=${limite}`, {});
  return response;
}

const getDetailsPokemon = async (url: string) => {
  const response = await api.get(url, {});
  return response;
}

export {
  getPokemons,
  getDetailsPokemon
}
