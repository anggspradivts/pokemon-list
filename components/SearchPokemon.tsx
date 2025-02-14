"use client";
import fetchData from "@/utils/fetcher";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface PokemonSearch {
  name: string;
  url: string;
  id: string;
}
const SearchPokemon = () => {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState<PokemonSearch[] | undefined>(
    []
  );

  useEffect(() => {
    const triggerFetchData = async () => {
      try {
        const data = await fetchData({ endpoint: "/pokemon?limit=2000" });
        const getPokemonId = data.results.map(
          (item: { name: string; url: string }) => {
            const splittedUrl = item.url.split("/");
            const pokemonId = splittedUrl[splittedUrl.length - 2];
            return {
              name: item.name,
              url: item.url,
              id: pokemonId,
            };
          }
        );
        setPokemonList(getPokemonId);
      } catch (error) {
        throw new Error("Error fetch search pokemon");
      }
    };
    triggerFetchData();
  }, []);

  const debounceKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const handler = setTimeout(() => {
      setKeyword(e.target.value);
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  };

  const filteredPokemon = useMemo(() => {
    if (!pokemonList) return null;
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword, pokemonList]);

  return (
    <div className="text-center relative">
      <div className="w-full border-2 border-black">
        <input
          className="w-full p-2"
          type="search"
          name="pokemon-search"
          id="pokemon-search"
          placeholder="e.g. Pikachu"
          onChange={debounceKeyword}
        />
      </div>
      {keyword && (
        <div className="text-start h-[300px] overflow-y-scroll mt-1 absolute bg-white w-full z-[1000] border-2 border-black">
          <ul>
            {filteredPokemon?.map((item, index) => (
              <Link key={index} href={`/pokemon-detail/${item.id}`}>
                <li className="border-b-2 borer-slate px-2 w-full">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPokemon;
