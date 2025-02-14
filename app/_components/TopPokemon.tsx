"use client";
import Header from "@/components/ui/header";
import { top_pokemon } from "@/data/top-pokemon";
import fetchData from "@/utils/fetcher";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const TopPokemon = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [topPokemon, setTopPokemon] = useState<
    { name: string; id: string; img: string }[] | undefined
  >([]);

  useEffect(() => {
    if (topPokemon) setIsLoading(false);
    const triggerGetTopPokemon = async () => {
      try {
        const getTopPokemon = await Promise.all(
          top_pokemon.map(
            async (pokemon: { id: string; name: string; img: string }) => {
              const getTopPokemonData: PokemonDetail = await fetchData({
                endpoint: `/pokemon/${pokemon.id}`,
              });
              return {
                name: getTopPokemonData.name,
                id: pokemon.id,
                img: getTopPokemonData.sprites.front_default,
              };
            }
          )
        );
        setTopPokemon(getTopPokemon);
      } catch (error) {
        console.log("error while fetching top pokemon", error);
        throw new Error("Error get top pokemon");
      }
    };
    triggerGetTopPokemon();
  }, []);

  return (
    <div>
      <Header text="Top Pokemon 🔥" classnames="no-underline text-first" />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-5 md:grid-cols-10 gap-3 w-full">
          {topPokemon?.map((item) => {
            return (
              <Link key={item.id} href={`/pokemon-detail/${item.id}`}>
                <div className="w-[80px] h-[100px] relative text-center">
                  <div className="h-5/6 relative  overflow-hidden border-2 ">
                    <Image
                      alt="pokemon-image"
                      src={item.img}
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
      )}
    </div>
  );
};

export default TopPokemon;
