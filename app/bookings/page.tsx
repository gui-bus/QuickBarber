import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { IoCalendarOutline } from "react-icons/io5";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import { Booking } from "@prisma/client";
import { Separator } from "../_components/ui/separator";
import { IoCheckmarkDone, IoCheckmark } from "react-icons/io5";
import { isFuture, isPast } from "date-fns";

const BookingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const bookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
    },
    include: {
      service: true,
      barbershop: true,
    },
  });

  const confirmedBookings = bookings.filter((booking: Booking) =>
    isFuture(booking.date),
  );
  const finishedBookings = bookings.filter((booking: Booking) =>
    isPast(booking.date),
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-5">
      <h1 className="flex items-center gap-2 text-xl font-semibold uppercase text-neutral-300">
        Agendamentos <IoCalendarOutline size={25} />
      </h1>

      <div className="flex flex-col gap-y-2 py-2">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase text-muted-foreground">
          Confirmados <IoCheckmark size={25} />
        </h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {confirmedBookings.map((booking: Booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-y-2 py-2">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase text-muted-foreground">
          Finalizados <IoCheckmarkDone size={25} />
        </h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {finishedBookings.map((booking: Booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
