"use client";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop, Booking, Service } from "@prisma/client";
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
import { useEffect, useMemo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { generateDayTimeList } from "../_helpers/hours";
import { addDays, format, setHours, setMinutes } from "date-fns";
import { IoMdCheckboxOutline } from "react-icons/io";
import { saveBooking } from "../_actions/save-booking";
import { useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getDayBookings } from "../_actions/get-day-bookings";

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
  const router = useRouter();
  const { data } = useSession();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!date) {
      return;
    }

    const refreshAvailableHours = async () => {
      const _dayBookings = await getDayBookings(barbershop.id, date);
      setDayBookings(_dayBookings);
    };

    refreshAvailableHours();
  }, [date, barbershop.id]);

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleHourClick = (time: string) => {
    setHour(time);
  };
  const timeList = useMemo(() => {
    if (!date) {
      return [];
    }

    return generateDayTimeList(date).filter((time) => {
      const timeHour = Number(time.split(":")[0]);
      const timeMinutes = Number(time.split(":")[1]);

      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours();
        const bookingMinutes = booking.date.getMinutes();

        return bookingHour === timeHour && bookingMinutes === timeMinutes;
      });

      if (!booking) {
        return true;
      }

      return false;
    });
  }, [date, dayBookings]);

  const handleBookingSubmit = async () => {
    setSubmitIsLoading(true);
    try {
      if (!hour || !date || !data?.user) {
        return;
      }

      const dateHour = Number(hour.split(":")[0]);
      const dateMinutes = Number(hour.split(":")[1]);
      const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

      await saveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        date: newDate,
        userId: (data.user as any).id,
      });

      setSheetIsOpen(false);
      setHour(undefined);
      setDate(undefined);

      toast("Reserva realizada com sucesso!", {
        description: format(
          newDate,
          "'Para o dia' dd 'de' MMMM 'às' HH':'mm'.'",
          {
            locale: ptBR,
          },
        ),
        action: {
          label: "Visualizar",
          onClick: () => router.push("/bookings"),
        },
      });
    } catch (error) {
      return toast.error("Ocorreu um erro ao criar sua reserva!", {
        style: {
          fontSize: "12px",
        },
      });
    } finally {
      setSubmitIsLoading(false);
    }
  };

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

              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
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
                        fromDate={addDays(new Date(), 1)}
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
                      <div className="grid grid-cols-5 gap-2 px-5 pb-5 pt-4 xl:grid-cols-3">
                        {timeList.map((time) => (
                          <Button
                            key={time}
                            variant={hour === time ? "default" : "outline"}
                            size={"sm"}
                            className="rounded-full dark:text-white"
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
                      </CardContent>
                    </Card>
                  </div>

                  <SheetFooter className="p-5">
                    <Button
                      className=" w-full text-white"
                      disabled={!hour || !date || submitIsLoading}
                      onClick={handleBookingSubmit}
                    >
                      {submitIsLoading ? (
                        <span className="flex items-center gap-4">
                          <ClipLoader color="#fff" size={20} /> Criando
                          reserva...
                        </span>
                      ) : (
                        <span className="flex items-center gap-4">
                          Confirmar reserva <IoMdCheckboxOutline size={25} />
                        </span>
                      )}
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
