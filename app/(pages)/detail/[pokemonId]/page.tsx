"use client"

import fetchData from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

const Page = ({ params }: { params: { pokemonId: string } }) => {
  const { pokemonId } = params;

  const { data } = useQuery<PokemonDetail | undefined>({
    queryKey: ["POKEMON_DETAIL", pokemonId],
    queryFn: () => fetchData({ endpoint: `/pokemon/${pokemonId}` })
  })

  console.log(data)
  return ( 
    <div>
      {data?.name}
    </div>
   );
}

export default Page;