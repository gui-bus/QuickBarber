import { BsStars } from "react-icons/bs";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import SearchSection from "../_sections/search-section";
import BarbershopItem from "./_components/barbershop-item";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../_components/ui/carousel";

import { Barbershop } from "@prisma/client";
import AboutSection from "../_sections/about-section";

export default async function Home() {
  const barbershops: Barbershop[] = await db.barbershop.findMany({
    where: {
      recommended: true,
    },
  });

  const popularBarbershops: Barbershop[] = await db.barbershop.findMany({
    where: {
      recommended: false,
    },
  });

  return (
    <main className="select-none">
      <div className="hidden md:block">
        <AboutSection />
      </div>

      <SearchSection />

      <div className="mt-6 flex select-none flex-col items-center justify-center gap-y-2 lg:hidden">
        <h2 className="flex items-center gap-2 px-5 text-sm font-semibold uppercase dark:text-white/70">
          Recomendados <BsStars size={25} />
        </h2>

        <Carousel className="mx-auto w-full px-5 py-5 md:max-w-3xl lg:max-w-6xl">
          <CarouselContent>
            {barbershops.map((barbershop) => (
              <CarouselItem
                key={barbershop.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <BarbershopItem barbershop={barbershop} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden xl:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>

      <div className="md:hidden">
        <AboutSection />
      </div>

      <div className="mt-6 flex select-none flex-col items-center justify-center gap-y-2">
        <h2 className="flex items-center gap-2 px-5 text-sm font-semibold uppercase dark:text-white/70">
          Populares <BsStars size={25} />
        </h2>

        <Carousel className="mx-auto w-full px-5 py-5 md:max-w-3xl lg:max-w-6xl">
          <CarouselContent>
            {popularBarbershops.map((barbershop) => (
              <CarouselItem
                key={barbershop.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <BarbershopItem barbershop={barbershop} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden xl:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </main>
  );
}
