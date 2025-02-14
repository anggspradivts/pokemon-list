import Header from "@/components/ui/header";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface PokemonMovesProps {
  data: PokemonDetail;
}
const PokemonMoves = ({ data }: PokemonMovesProps) => {
  const { pokemonId } = useParams();
  return (
    <div className="px-7 md:px-[200px] py-5 md:text-center">
      <div className="flex md:flex-col space-x-2">
        <Header text="Pokemon Moves" />
        <div className="flex items-center md:justify-center text-slate-500">
          <AlertCircle className="h-4 w-4" />
          <p className="italic">click to see the detail</p>
        </div>
      </div>
      <div className="grid grid-cols-3">
        {data.moves.slice(0, 30).map((item, index) => {
          const splitMoveId = item.move.url.split("/");
          const getMoveId = splitMoveId[splitMoveId.length - 2];
          return (
            <Link
              href={`/pokemon-detail/${pokemonId}/moves/${getMoveId}`}
              key={index}
            >
              <div className="hover:underline">{item.move.name}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonMoves;
