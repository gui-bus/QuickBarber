"use client";
import { LucideHome } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Prisma } from "@prisma/client";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IoReturnDownBack } from "react-icons/io5";
import { LuCalendarX2 } from "react-icons/lu";
import { ClipLoader } from "react-spinners";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [cancelIsLoading, setCancelIsLoading] = useState(false);

  const handleCancelClick = async () => {
    try {
      setCancelIsLoading(true);
      await cancelBooking(booking.id);
      setDrawerIsOpen(false);
      toast.success("Reserva removida com sucesso!");
    } catch (error) {
      return toast.error("Ocorreu um erro!");
    } finally {
      setCancelIsLoading(false);
    }
  };

  return (
    <Drawer open={drawerIsOpen} onOpenChange={setDrawerIsOpen}>
      <DrawerTrigger asChild>
        <Card
          className={`w-full cursor-pointer select-none ${isPast(booking.date) ? "opacity-60" : ""} `}
        >
          <CardContent className="p-5 px-0">
            <div className="flex items-center justify-around">
              <div className="flex flex-col gap-y-3">
                <Badge
                  className={`w-fit ${isPast(booking.date) ? "dark:text-white" : "dark:text-white"}`}
                  variant={isPast(booking.date) ? "outline" : "default"}
                >
                  {isPast(booking.date) ? "Finalizado" : "Confirmado"}
                </Badge>

                <div className="flex flex-col gap-y-2">
                  <h2 className="text-lg font-semibold">
                    {booking.service.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={booking.barbershop.imageUrl} />
                      <AvatarFallback>
                        <LucideHome size={20} />
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-light">{booking.barbershop.name}</h3>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <p className="text-sm capitalize">
                  {format(booking.date, "MMMM", { locale: ptBR })}
                </p>
                <p className="text-2xl font-semibold">
                  {format(booking.date, "dd")}
                </p>
                <p className="text-sm">{format(booking.date, "HH':'mm")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Detalhes do agendamento</DrawerTitle>
          <DrawerDescription className="py-5">
            <div className="flex h-40 w-full items-center justify-center rounded-3xl bg-[url('/capa.png')] bg-cover bg-center bg-no-repeat">
              <Card>
                <CardContent className="p-0 px-5 py-2">
                  <div className="flex items-center justify-between gap-5">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={booking.barbershop.imageUrl} />
                      <AvatarFallback>
                        <LucideHome size={20} />
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col items-start gap-1">
                      <h3 className="text-xl font-medium">
                        {booking.barbershop.name}
                      </h3>
                      <p className="truncate text-sm font-light text-muted-foreground">
                        {booking.barbershop.address}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="my-5">
              <CardContent className="p-0">
                <div className="flex flex-col gap-3 p-5">
                  <div className="flex w-full justify-between gap-5">
                    <h4 className="w-1/2 text-start text-sm text-muted-foreground">
                      Status
                    </h4>
                    <Badge
                      className={`flex w-fit items-start ${isPast(booking.date) ? "dark:text-white" : "dark:text-white"}`}
                      variant={isPast(booking.date) ? "outline" : "default"}
                    >
                      {isPast(booking.date) ? "Finalizado" : "Confirmado"}
                    </Badge>
                  </div>
                  <div className="flex w-full justify-between gap-5">
                    <h4 className="w-1/2 text-start text-sm text-muted-foreground">
                      Barbearia
                    </h4>
                    <p className="w-1/2 truncate text-end text-sm">
                      {booking.barbershop.name}
                    </p>
                  </div>
                  <div className="flex w-full justify-between gap-5">
                    <h4 className="w-1/2 text-start text-sm text-muted-foreground">
                      Serviço
                    </h4>
                    <p className="w-1/2 truncate text-end text-sm">
                      {booking.service.name}
                    </p>
                  </div>
                  <div className="flex w-full justify-between gap-5">
                    <h4 className="w-1/2 text-start text-sm text-muted-foreground">
                      Valor
                    </h4>
                    <p className="w-1/2 text-end text-sm">
                      {Number(booking.service.price).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>

                  <div className="flex w-full justify-between gap-5">
                    <h4 className="w-1/2 text-start text-sm text-muted-foreground">
                      Data
                    </h4>
                    <p className="w-1/2 text-end text-sm">
                      {format(booking.date, "dd 'de' MMMM", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>

                  <div className="flex w-full justify-between gap-5">
                    <h4 className="w-1/2 text-start text-sm text-muted-foreground">
                      Horário
                    </h4>
                    <p className="w-1/2 text-end text-sm">
                      {format(booking.date, "HH':'mm")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex w-full items-center justify-center gap-4">
            <DrawerClose className="w-fit">
              <Button variant="outline" className="w-fit">
                <IoReturnDownBack size={25} className="mr-2" /> Voltar
              </Button>
            </DrawerClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full text-white" variant={"default"}>
                  {isPast(booking.date)
                    ? "Apagar do histórico"
                    : "Cancelar agendamento"}{" "}
                  <LuCalendarX2 size={25} className="ml-2" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%] rounded-xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center text-base">
                    Tem certeza que deseja{" "}
                    {isPast(booking.date) ? "apagar" : "cancelar"} esse
                    agendamento?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <p className="text-center text-sm">
                      Esta ação não pode ser desfeita!
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col md:flex-row gap-4">
                  <AlertDialogCancel className="w-full">
                    Voltar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={cancelIsLoading}
                    onClick={handleCancelClick}
                    className="w-full"
                  >
                    {cancelIsLoading ? (
                      <span className="flex items-center gap-4">
                        <ClipLoader color="#fff" size={20} />{" "}
                        {isPast(booking.date)
                          ? "Removendo..."
                          : "Cancelando..."}
                      </span>
                    ) : (
                      <span className="flex items-center gap-4">Confirmar</span>
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default BookingItem;
