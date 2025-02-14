import Header from "@/components/ui/header";

interface PokemonStatProps {
  data: PokemonDetail;
}
const PokemonStat = ({ data }: PokemonStatProps) => {
  return (
    <div className="grid grid-cols-1 space-y-5 px-7 md:px-20 py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
        <div className="text-start flex md:justify-end py-5">
          <div className="border-b-2 md:border-none border-black">
            <Header text="Pokemon Stat" />
            {data.stats.map((item, index) => (
              <div className="flex" key={index}>
                <strong>{item.stat.name}:</strong>
                <div>{item.base_stat}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex py-5">
          <div className="border-b-2 md:border-none border-black">
            <Header text="Pokemon Abilities" />
            {data.abilities.map((item, index) => (
              <div className="flex" key={index}>
                <strong className="hover:underline">{item.ability.name}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex md:justify-center py-5">
        <div>
          <Header classnames="text-center" text="Pokemon Held Items" />
          <div className="flex max-w-full flex-wrap">
            {data.held_items.length > 1 ? (
              data.held_items.map((item, index) => (
                <div className="flex" key={index}>
                  <strong>
                    {item.item.name}
                    {index === data.held_items.length - 1 ? "." : ","}
                  </strong>
                </div>
              ))
            ) : (
              <div>No held items</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonStat;
