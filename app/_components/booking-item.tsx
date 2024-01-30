import { LucideHome } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-5">
        <div className="flex items-center justify-around">
          <div className="flex flex-col gap-y-3">
            <Badge className="w-fit text-primary" variant={"outline"}>
              Confirmado
            </Badge>

            <div className="flex flex-col gap-y-2">
              <h2 className="text-lg font-semibold">Corte de Cabelo</h2>
              <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://utfs.io/f/164faf88-90ea-44f4-9e4d-2d1e5229ad90-18e.png" />
                  <AvatarFallback>
                    <LucideHome size={20} />
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-sm">A Navalha Dourada</h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="text-sm">Fevereiro</p>
            <p className="text-2xl font-semibold">06</p>
            <p className="text-sm">09:45</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
