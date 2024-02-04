import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { IoCalendarOutline } from "react-icons/io5";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import { Booking } from "@prisma/client";
import { Separator } from "../_components/ui/separator";
import { IoCheckmarkDone, IoCheckmark } from "react-icons/io5";
import { Card, CardContent } from "../_components/ui/card";
import { authOptions } from "../_lib/auth";

const BookingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
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
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
      orderBy: {
        date: "asc",
      },
    }),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-5">
      <h1 className="flex items-center gap-2 text-xl font-semibold uppercase dark:text-white">
        Agendamentos <IoCalendarOutline size={25} />
      </h1>

      <div className="flex flex-col gap-y-2 py-2">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase dark:text-muted-foreground">
          Confirmados <IoCheckmark size={25} />
        </h2>
        {confirmedBookings.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {confirmedBookings.map((booking: Booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <Card className="mt-5 w-fit">
            <CardContent className="p-5">
              <h4 className="text-xs">
                Você ainda não possui nenhum agendamento confirmado
              </h4>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator />

      <div className="flex flex-col gap-y-2 py-2">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase dark:text-muted-foreground">
          Finalizados <IoCheckmarkDone size={25} />
        </h2>
        {finishedBookings.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {finishedBookings.map((booking: Booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <Card className="mt-5 w-fit">
            <CardContent className="p-5">
              <h4 className="text-xs">
                Você ainda não possui nenhum agendamento finalizado
              </h4>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
