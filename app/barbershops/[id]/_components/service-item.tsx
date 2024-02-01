"use client";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop, Service } from "@prisma/client";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Separator } from "@/app/_components/ui/separator";
import { Calendar } from "@/app/_components/ui/calendar";
import { useMemo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { generateDayTimeList } from "../_helpers/hours";
import { format } from "date-fns";
import { IoMdCheckboxOutline } from "react-icons/io";

interface ServiceItemProps {
  barbershop: Barbershop;
  service: Service;
  isAuthenticated: boolean;
}

const ServiceItem = ({
  service,
  isAuthenticated,
  barbershop,
}: ServiceItemProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleHourClick = (time: string) => {
    setHour(time);
  };
  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

  return (
    <Card>
      <CardContent className="px-4 py-2">
        <div className="flex items-center justify-between gap-5">
          <Image
            src={service.imageUrl}
            alt={service.name}
            width={0}
            height={0}
            sizes="100vw"
            className="aspect-square h-auto w-28 rounded-xl object-cover"
          />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold">{service.name}</h3>
              <p className="line-clamp-2 text-sm font-light text-muted-foreground">
                {service.description}
              </p>
            </div>

            <div className="flex items-center justify-around">
              <p className="font-bold">
                {Number(service.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={"outline"} disabled={!isAuthenticated}>
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0">
                  <SheetHeader className="p-5">
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col items-center justify-center xl:flex-row">
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateClick}
                        locale={ptBR}
                        fromDate={new Date()}
                        styles={{
                          head_cell: {
                            textTransform: "capitalize",
                          },
                          caption: {
                            textTransform: "capitalize",
                          },
                        }}
                      />
                    </div>

                    {date && (
                      <div className="grid grid-cols-5 xl:grid-cols-3 gap-2 px-5 pb-5 pt-4">
                        {timeList.map((time) => (
                          <Button
                            key={time}
                            variant={hour === time ? "default" : "outline"}
                            size={"sm"}
                            className="rounded-full text-white"
                            onClick={() => handleHourClick(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>

                  <Separator className="mb-5" />

                  <div className="px-5">
                    <Card>
                      <CardContent className="flex flex-col gap-3 p-5">
                        <div className="flex w-full justify-between gap-5">
                          <h4 className="w-1/2 text-sm text-muted-foreground">
                            Serviço
                          </h4>
                          <p className="w-1/2 truncate text-end text-sm">
                            {service.name}
                          </p>
                        </div>
                        <div className="flex w-full justify-between gap-5">
                          <h4 className="w-1/2 text-sm text-muted-foreground">
                            Valor
                          </h4>
                          <p className="w-1/2 text-end text-sm">
                            {Number(service.price).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                        </div>

                        {date && (
                          <div className="flex w-full justify-between gap-5">
                            <h4 className="w-1/2 text-sm text-muted-foreground">
                              Data
                            </h4>
                            <p className="w-1/2 text-end text-sm">
                              {format(date, "dd 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </p>
                          </div>
                        )}

                        {hour && (
                          <div className="flex w-full justify-between gap-5">
                            <h4 className="w-1/2 text-sm text-muted-foreground">
                              Horário
                            </h4>
                            <p className="w-1/2 text-end text-sm">{hour}</p>
                          </div>
                        )}

                        {/* <div className="flex w-full justify-between gap-5">
                          <h4 className="w-1/2 text-sm text-muted-foreground">
                            Barbearia
                          </h4>
                          <p className="w-1/2 truncate text-end text-sm">
                            {barbershop.name}
                          </p>
                        </div> */}
                      </CardContent>
                    </Card>
                  </div>

                  <SheetFooter className="p-5">
                    <Button className="flex w-full items-center gap-4 text-white" disabled={!hour || !date}>
                      Confirmar reserva <IoMdCheckboxOutline size={25} />
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
