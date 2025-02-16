"use client";
import Header from "@/components/ui/header";
import fetchData from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const PokemonMovesDetail = () => {
  const { moveId } = useParams();

  const { data, error, isLoading } = useQuery<PokemonMove | undefined>({
    queryKey: ["POKEMON_MOVES", moveId],
    queryFn: () => fetchData({ endpoint: `/move/${moveId}` }),
  });

  if (error) return <div>Error fetching data, try again later</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div>
      <Header text={data.name} classnames="" />
      <p>damage type: {data.damage_class.name}</p>
      {data.effect_entries.map((item, index) => (
        <div key={index}>
          <p>
            {item.effect}{" "}
            <span className="italic">short effect: {item.short_effect}</span>
          </p>
        </div>
      ))}
      <p>Normal contest combos</p>
      <div className="flex">
        <p>Use after: </p>
        <div className="flex">
          {data.contest_combos?.normal.use_after?.length > 1 ? (
            data.contest_combos.normal.use_after.map((item, index) => (
              <p key={index}>
                {item.name}
                {data.contest_combos.normal.use_after.length - 1 !== index &&
                  ","}
              </p>
            ))
          ) : (
            <div>no normal combos</div>
          )}
        </div>
      </div>
      <div className="flex">
        <p>Use before: </p>
        <div className="flex">
          {data.contest_combos?.normal.use_before?.length > 1 ? (
            data.contest_combos.normal.use_before.map((item, index) => (
              <p key={index}>
                {item.name}
                {data.contest_combos.normal.use_before.length - 1 !== index &&
                  ","}
              </p>
            ))
          ) : (
            <div>no normal combos</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonMovesDetail;
