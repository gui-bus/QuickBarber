import Search from "../(home)/_components/search";
import BookingItem from "../_components/booking-item";
import { MdOutlineBookmarkAdded } from "react-icons/md";

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
import { getServerSession } from "next-auth";

import { Card, CardContent } from "../_components/ui/card";
import { authOptions } from "../_lib/auth";

const SearchSection = async () => {
  const session = await getServerSession(authOptions);

  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({
      where: {
        recommended: true,
      },
    }),
    session?.user
      ? db.booking.findMany({
          where: {
            userId: (session?.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
          orderBy: {
            date: "asc",
          },
        })
      : Promise.resolve([]),
  ]);

  return (
    <section className=" bg-[url('/capa.png')] bg-cover bg-center bg-no-repeat px-5 py-10">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-around gap-5">
        <div className="flex w-full max-w-sm flex-col gap-y-5">
          <WelcomeMessage />

          <Search />

          {session?.user && (
            <div className="flex flex-col items-center justify-center">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase text-white dark:text-white/70">
                Seus agendamentos <MdOutlineBookmarkAdded size={25} />
              </h2>

              {confirmedBookings.length > 0 ? (
                <Carousel className="mx-auto w-full max-w-2xl px-5 py-5">
                  <CarouselContent>
                    {confirmedBookings.map((booking: any) => (
                      <CarouselItem key={booking.id}>
                        <BookingItem key={booking.id} booking={booking} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="hidden xl:block">
                    <CarouselPrevious />
                    <CarouselNext />
                  </div>
                </Carousel>
              ) : (
                <Card className="mt-5">
                  <CardContent className="p-5">
                    <h4 className="text-xs">
                      Você ainda não possui nenhum agendamento
                    </h4>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 hidden select-none flex-col items-center justify-center gap-y-2 lg:flex">
          <h2 className="flex items-center gap-2 px-5 text-sm font-semibold uppercase text-neutral-300">
            Recomendados <BsStars size={25} />
          </h2>

          <Carousel className="mx-auto w-full max-w-2xl px-5 py-5">
            <CarouselContent>
              {barbershops.map((barbershop: any) => (
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
