"use client";

import fetchData from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import PokemonCarousel from "./_components/PokemonCarousel";
import PokemonStat from "./_components/PokemonStat";
import PokemonMoves from "./_components/PokemonMoves";
import Header from "@/components/ui/header";

const Page = () => {
  const params = useParams();
  const { pokemonId } = params;

  const { data } = useQuery<PokemonDetail | undefined>({
    queryKey: ["POKEMON_DETAIL", pokemonId],
    queryFn: () => fetchData({ endpoint: `/pokemon/${pokemonId}` }),
  });

  if (!data) return <div>No data available</div>;

  return (
    <div>
      <PokemonCarousel data={data} />
      <div className="bg-slate-300">
        <Header text="Pokemon Details" classnames="p-2 text-3xl w-full bg-slate-400" />
        <PokemonStat data={data} />
        <PokemonMoves data={data} />
      </div>
    </div>
  );
};

export default Page;
