import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";

import { Barbershop } from "@prisma/client";
import Image from "next/image";

const BarbershopItem = ({ barbershop }: Barbershop) => {
  return (
    <Card className="w-full rounded-2xl">
      <CardContent className="p-1">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          sizes="100vw"
          height={0}
          width={0}
          className="h-40 w-full rounded-2xl object-cover"
        />
        <div className="flex flex-col gap-y-4 p-2">
          <div>
            <h2 className="font-bold">{barbershop.name}</h2>
            <p className="line-clamp-1 truncate text-sm text-muted-foreground">
              {barbershop.address}
            </p>
          </div>
          <Button variant={"outline"} className="w-full">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
