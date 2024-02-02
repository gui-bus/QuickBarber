import { LucideHome } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Prisma } from "@prisma/client";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  return (
    <Card className={`w-full select-none ${isPast(booking.date) ? "opacity-60" : ""} `}>
      <CardContent className="p-5 px-0">
        <div className="flex items-center justify-around">
          <div className="flex flex-col gap-y-3">
            <Badge
              className={`w-fit ${isPast(booking.date) ? "text-white" : "text-white"}`}
              variant={isPast(booking.date) ? "outline" : "default"}
            >
              {isPast(booking.date) ? "Finalizado" : "Confirmado"}
            </Badge>

            <div className="flex flex-col gap-y-2">
              <h2 className="text-lg font-semibold">{booking.service.name}</h2>
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
  );
};

export default BookingItem;
