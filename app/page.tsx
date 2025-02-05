"use client";
import fetchData from "@/utils/fetcher";
import PokemonList from "./_components/PokemonList";
import { useEffect, useState } from "react";
import SearchPokemon from "./_components/SearchPokemon";

interface ListPokemonProps {
  name: string;
  url: string;
  image: string;
  id: number;
}
const Home = () => {
  const [listPokemon, setListPokemon] = useState<ListPokemonProps[] | undefined>([])

  useEffect(() => {
    const getListPokemon = async () => {
      try {
        const data = await fetchData({ endpoint: "/pokemon" });

        const getPokemonDetails = await Promise.all(
          data.results.map(async (pokemon: { name: string, url: string }) => {
            const res = await fetch(pokemon.url);
            const pokemonDetails: PokemonDetail = await res.json();
            console.log(pokemonDetails)
            return {
              name: pokemon.name,
              url: pokemon.url,
              image: pokemonDetails.sprites.front_default,
              id: pokemonDetails.id
            }
          })
        )
        setListPokemon(getPokemonDetails)
      } catch (error) {
        throw new Error("Error get list pokemon")
      }
    }
    getListPokemon() 
  }, [])  

  return (
    <div className="h-screen flex justify-center items-center">
      <SearchPokemon />
      <PokemonList data={listPokemon} />
    </div>
  );
};

export default Home;
