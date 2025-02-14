import fetchData from "@/utils/fetcher";
import PokemonList from "./_components/PokemonList";
import SearchPokemon from "../components/SearchPokemon";
import Header from "@/components/ui/header";
import TopPokemon from "./_components/TopPokemon";


const Home = async () => {
  type Response = {
    results: {
      name: string;
      url: string;
      image: string;
      id: number;
    }[];
  }
  const data: Response = await fetchData({ endpoint: "/pokemon?limits=100" });
  

  if (!data) return <div>No data available</div>;

  return (
    <div className="flex flex-col md:justify-center items-center space-y-10">
      <div className="md:w-[500px] text-center">
        <Header text="Search Pokemon" classnames="no-underline" />
        <SearchPokemon />
      </div>
      <TopPokemon />
      <PokemonList data={data} />
    </div>
  );
};

export default Home;
