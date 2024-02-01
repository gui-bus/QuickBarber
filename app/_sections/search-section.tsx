import Search from "../(home)/_components/search";
import BookingItem from "../_components/booking-item";
import { MdOutlineBookmarkAdded } from "react-icons/md";

import { Barbershop } from "@prisma/client";
import { db } from "../_lib/prisma";
import { BsStars } from "react-icons/bs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../_components/ui/carousel";
import BarbershopItem from "../(home)/_components/barbershop-item";
import WelcomeMessage from "../(home)/_components/welcome-message";

const SearchSection = async () => {
  const barbershops: Barbershop[] = await db.barbershop.findMany({
    where: {
      recommended: true,
    },
  });

  return (
    <section className=" bg-[url('/capa.png')] bg-cover bg-center bg-no-repeat px-5 py-10">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-around gap-5">
        <div className="flex w-full max-w-sm flex-col gap-y-5">
          <WelcomeMessage/>

          <Search />

          <div className="flex flex-col gap-y-2">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase text-neutral-300">
              Agendamentos <MdOutlineBookmarkAdded size={25} />
            </h2>
            <BookingItem />
          </div>
        </div>

        <div className="mt-6 hidden select-none flex-col items-center justify-center gap-y-2 lg:flex">
          <h2 className="flex items-center gap-2 px-5 text-sm font-semibold uppercase text-neutral-300">
            Recomendados <BsStars size={25} />
          </h2>

          <Carousel className="mx-auto w-full max-w-2xl px-5 py-5">
            <CarouselContent>
              {barbershops.map((barbershop) => (
                <CarouselItem
                  key={barbershop.id}
                  className="basis-1/2 md:basis-1/3"
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
      </div>
    </section>
  );
};

export default SearchSection;
