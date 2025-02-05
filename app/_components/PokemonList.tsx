"use client";
import Image from "next/image";
import Link from "next/link";


interface PokemonListProps {
  data: {
    name: string;
    url: string;
    image: string;
    id: number;
  }[] | undefined;
}
const PokemonList = ({ data }: PokemonListProps) => {
  console.log("from Pokemon section", data);
  return (
    <div className="grid grid-cols-10 gap-3">
      {data?.map((item) => {
        return (
          <Link key={item.id} href={`/detail/${item.id}`}>
            <div className=" h-[100px] relative text-center">
              <div className="h-5/6 relative rounded-3xl overflow-hidden border-2 ">
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
  );
};

export default PokemonList;
