import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon } from "lucide-react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { Barbershop } from "@prisma/client";
import { Separator } from "@/app/_components/ui/separator";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { FiClock } from "react-icons/fi";

interface BarbershopDetailsProps {
  params: {
    id?: string;
  };
}

const BarbershopDetails = async ({ params }: BarbershopDetailsProps) => {
  if (!params.id) {
    return null;
  }

  const barbershop: Barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!barbershop) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full flex-col lg:my-5 lg:flex-row lg:pl-5">
      <div className="relative mx-auto h-64 w-full lg:hidden lg:h-96">
        <Button variant={"outline"} className="absolute left-4 top-4 z-50">
          <ChevronLeftIcon />
        </Button>

        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover opacity-70"
        />
      </div>

      <h1 className="mt-5 text-center text-2xl font-bold md:hidden md:text-3xl">
        {barbershop.name}
      </h1>

      <div className="relative flex w-full justify-around">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          width={0}
          height={0}
          sizes="100vw"
          className="hidden aspect-square h-auto w-1/3 rounded-3xl object-cover opacity-70 lg:block"
        />

        <Button
          variant={"outline"}
          className="absolute left-4 top-4 z-50 hidden lg:block"
        >
          <ChevronLeftIcon />
        </Button>

        <div className="flex flex-col gap-y-4 p-5 lg:w-2/3">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
            <div className="flex items-center justify-around gap-2 lg:pl-5">
              <div>
                <h1 className="mb-3 hidden text-center text-2xl font-bold md:block md:text-3xl">
                  {barbershop.name}
                </h1>
                <div className="flex flex-col flex-wrap items-center justify-center gap-2 lg:flex-row lg:gap-4">
                  <p className="line-clamp-1 flex items-center gap-2 truncate text-sm">
                    <MapPinIcon size={20} className="text-primary" />{" "}
                    {barbershop.address}
                  </p>

                  <p className="flex items-center gap-2">
                    <FaWhatsapp size={20} className="text-primary" />{" "}
                    {barbershop.phone}
                  </p>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="flex items-center justify-center gap-2 p-5">
                <p className="flex items-center gap-2 text-xl font-bold">
                  <FaStar size={30} className="text-primary" />
                  {barbershop.rating.toString()}
                </p>
                <p className="line-clamp-1 truncate text-sm">
                  ({barbershop.ratingQTD.toString()} Avaliações)
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-5 flex flex-col items-center justify-between gap-5 lg:flex-row">
            <Card className="lg:w-full">
              <CardContent className="flex flex-col gap-5 p-5">
                <div className="flex flex-col text-center md:text-start">
                  <h3 className="text-xl font-bold">Sobre nós</h3>
                  <Separator className="my-4" />
                  <p className="text-sm font-light">{barbershop.description}</p>
                </div>

                <Separator />

                <h4 className="text-center text-sm font-light lg:text-start">
                  Para melhor atendê-los também proporcionamos alguns itens
                  como:{" "}
                </h4>
                <div className="mx-auto grid grid-cols-2 gap-x-3 gap-y-3 lg:flex lg:flex-wrap lg:gap-x-0">
                  {barbershop.bonusItems.map(
                    (bonusItem: string, index: any) => (
                      <div
                        className="flex w-full items-center justify-start gap-2 text-sm font-medium md:w-1/2"
                        key={index}
                      >
                        <IoMdCheckmarkCircleOutline
                          size={20}
                          className="text-primary"
                        />

                        <p>{bonusItem}</p>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex w-full flex-col gap-5 lg:w-fit">
              <Card>
                <CardHeader className="flex items-center justify-center text-center">
                  Horário de Funcionamento
                </CardHeader>
                <Separator />
                <CardContent className="flex flex-col gap-5 p-5">
                  <div className="flex flex-col gap-y-3">
                    {barbershop.openings.map((booking: string, index: any) => (
                      <div
                        className="flex w-full items-center justify-center gap-2 whitespace-nowrap"
                        key={index}
                      >
                        <p className="text-xs">{booking}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarbershopDetails;
