"use client";
import Header from "@/components/ui/header";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ListPokemonProps {
  name: string;
  url: string;
  image: string;
  id: number;
}
interface PokemonListProps {
  data: {
    results: {
      name: string;
      url: string;
      image: string;
      id: number;
    }[];
  };
}
const PokemonList = ({ data }: PokemonListProps) => {
  const [listPokemon, setListPokemon] = useState<
    ListPokemonProps[] | undefined
  >([]);

  useEffect(() => {
    const getListPokemon = async () => {
      try {
        const getPokemonDetails = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }) => {
            const res = await fetch(pokemon.url);
            const pokemonDetails: PokemonDetail = await res.json();
            return {
              name: pokemon.name,
              url: pokemon.url,
              image: pokemonDetails.sprites.front_default,
              id: pokemonDetails.id,
            };
          })
        );
        setListPokemon(getPokemonDetails);
      } catch (error) {
        throw new Error("Error get list pokemon");
      }
    };
    getListPokemon();
  }, [data]);

  return (
    <div>
      <Header text="Pokemon List" classnames="no-underline text-first" />
      <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
        {listPokemon?.map((item) => {
          return (
            <Link key={item.id} href={`/pokemon-detail/${item.id}`}>
              <div className="w-[80px] h-[100px] relative text-center">
                <div className="h-5/6 relative  overflow-hidden border-2 ">
                  <Image
                    alt="pokemon-image"
                    src={item.image}
                    fill
                    objectFit="cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <strong className={``}>{item.name}</strong>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonList;
