"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useMemo } from "react";

interface PokemonCarouselProps {
  data: PokemonDetail | undefined;
}
const PokemonCarousel = ({ data }: PokemonCarouselProps) => {
  type PokemonImages = {
    img: string | null;
  }[];
  const images: PokemonImages = useMemo(() => {
    if (!data?.sprites) return [];
    return [
      { img: data.sprites.front_default },
      { img: data.sprites.back_default },
    ];
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center relative py-20">
      <Carousel>
        <CarouselContent>
          {images.length > 0 ? (
            images.map((item, index) => (
              <CarouselItem className="h-[200px] w-[100px]" key={index}>
                <div className="w-full h-full relative flex justify-center items-center">
                  {item.img ? (
                    <Image
                      alt={`${data?.name}-image`}
                      src={item.img}
                      fill
                      objectFit="cover"
                    />
                  ) : (
                    <div>No image available</div>
                  )}
                </div>
              </CarouselItem>
            ))
          ) : (
            <div>No images found</div>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <strong className="text-3xl">{data?.name}</strong>
    </div>
  );
};

export default PokemonCarousel;
