"use client";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiMapPinFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { Separator } from "@/app/_components/ui/separator";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { Barbershop, Service } from "@prisma/client";
import { useRouter } from "next/navigation";
import ServiceItem from "./service-item";
import { HiScissors } from "react-icons/hi2";
import { useSession } from "next-auth/react";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const { data, status } = useSession();
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col">
      <div className=" lg:my-5 lg:flex-row">
        <div className="relative mx-auto h-64 w-full lg:hidden lg:h-96">
          <Button
            onClick={handleBackClick}
            variant={"outline"}
            className="absolute left-4 top-4 z-50"
          >
            <ChevronLeftIcon />
          </Button>

          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            sizes="100vw"
            className="object-cover dark:opacity-70"
          />
        </div>

        <h1 className="mt-5 text-center text-2xl font-bold md:hidden md:text-3xl">
          {barbershop.name}
        </h1>

        <div className="relative flex w-full justify-around xl:pl-5">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            width={0}
            height={0}
            sizes="100vw"
            className="hidden aspect-square h-auto w-1/3 rounded-3xl object-cover opacity-70 lg:block"
          />

          <Button
            onClick={handleBackClick}
            variant={"outline"}
            className="absolute left-8 top-4 z-50 hidden lg:block"
          >
            <ChevronLeftIcon />
          </Button>

          <div className="flex w-full flex-col gap-y-4 p-5 lg:w-2/3">
            <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
              <div className="flex items-center justify-around gap-2 lg:pl-5">
                <div>
                  <h1 className="mb-3 hidden text-center text-2xl font-bold md:block md:text-3xl">
                    {barbershop.name}
                  </h1>
                  <div className="flex flex-col flex-wrap items-center justify-center gap-2 lg:flex-row lg:gap-4">
                    <p className="line-clamp-1 flex items-center gap-2 truncate text-sm">
                      <PiMapPinFill size={20} className="text-primary" />{" "}
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
                    <FaStar size={30} className="text-yellow-600" />
                    {barbershop.rating.toString()}
                  </p>
                  <p className="line-clamp-1 truncate text-sm">
                    ({barbershop.ratingQTD.toString()} Avaliações)
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs
              defaultValue="services"
              className="flex w-full flex-col items-center justify-center lg:hidden"
            >
              <TabsList className="my-2">
                <TabsTrigger value="services">Serviços</TabsTrigger>
                <TabsTrigger value="info">Informações</TabsTrigger>
              </TabsList>
              <TabsContent value="services" className="w-full">
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {barbershop.services.map((service: Service) => (
                    <ServiceItem
                      key={service.id}
                      service={service}
                      isAuthenticated={!!data?.user}
                      barbershop={barbershop}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="info">
                <div className="mt-5 flex flex-col items-center justify-between gap-5 lg:flex-row">
                  <Card className="lg:w-full">
                    <CardContent className="flex flex-col gap-5 p-5">
                      <div className="flex flex-col text-center">
                        <h3 className="text-xl font-bold">Sobre nós</h3>
                        <Separator className="my-4" />
                        <p className="text-sm font-light">
                          {barbershop.description}
                        </p>
                      </div>

                      <Separator />

                      <h4 className="text-center text-sm font-light lg:text-start">
                        Para melhor atendê-los também proporcionamos alguns
                        itens como:{" "}
                      </h4>
                      <div className="mx-auto grid grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
                        {barbershop.bonusItems.map(
                          (bonusItem: string, index: any) => (
                            <div
                              className="flex w-full items-center justify-start gap-2 text-sm font-medium"
                              key={index}
                            >
                              <p className="flex items-center gap-2">
                                <IoMdCheckmarkCircleOutline
                                  size={20}
                                  className="text-primary"
                                />
                                {bonusItem}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-5 hidden flex-col items-center justify-between gap-5 lg:flex lg:flex-row">
              <Card className="lg:w-full">
                <CardContent className="flex flex-col gap-5 p-5">
                  <div className="flex flex-col text-center ">
                    <h3 className="text-xl font-bold">Sobre nós</h3>
                    <Separator className="my-4" />
                    <p className="text-sm font-light">
                      {barbershop.description}
                    </p>
                  </div>

                  <Separator />

                  <h4 className="text-center text-sm font-light">
                    Para melhor atendê-los também proporcionamos alguns itens
                    como:{" "}
                  </h4>
                  <div className="mx-auto grid grid-cols-1 gap-x-3 gap-y-3 md:grid-cols-2 xl:grid-cols-3">
                    {barbershop.bonusItems.map(
                      (bonusItem: string, index: any) => (
                        <div
                          className="flex w-full items-center justify-start gap-2 text-sm font-medium"
                          key={index}
                        >
                          <p className="flex items-center gap-2">
                            <IoMdCheckmarkCircleOutline
                              size={20}
                              className="text-primary"
                            />
                            {bonusItem}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Separator className="mb-5 hidden lg:block" />

      <div className="hidden flex-col gap-4 lg:flex">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="flex items-center gap-2 text-2xl font-semibold uppercase">
            Serviços <HiScissors size={25} className="text-primary" />
          </h2>
          <p className="text-sm font-light">
            Descubra a variedade de serviços oferecidos pela {barbershop.name} e
            escolha o que mais combina com você.
          </p>
          <p className="text-sm font-medium ">
            Estamos prontos para transformar sua experiência em algo único e
            especial.
          </p>

          {status === "unauthenticated" && (
            <p className="text-xs text-red-500">
              Para reservar um serviço é preciso estar logado!
            </p>
          )}
        </div>

        <div className="mb-5 grid-cols-1 gap-5 px-5 md:grid-cols-2 lg:grid xl:grid-cols-3">
          {barbershop.services.map((service: Service) => (
            <ServiceItem
              key={service.id}
              service={service}
              isAuthenticated={!!data?.user}
              barbershop={barbershop}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarbershopInfo;
