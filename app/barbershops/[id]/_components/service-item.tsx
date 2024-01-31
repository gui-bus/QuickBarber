import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Service } from "@prisma/client";
import Image from "next/image";

interface ServiceItemProps {
  service: Service;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card>
      <CardContent className="py-2 px-4">
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
              <h3 className="font-bold text-lg">{service.name}</h3>
              <p className="text-sm font-light text-muted-foreground line-clamp-2">
                {service.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="font-bold">
                {Number(service.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>

              <Button variant={"outline"} className="px-5 lg:px-10">Reservar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
