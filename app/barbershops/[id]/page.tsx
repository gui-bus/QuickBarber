import { db } from "@/app/_lib/prisma";
import { Barbershop } from "@prisma/client";
import BarbershopInfo from "./_components/barbershop-info";

interface BarbershopDetailsProps {
  params: {
    id?: string;
  };
}

const BarbershopDetails = async ({ params }: BarbershopDetailsProps) => {

  if (!params.id) {
    return null;
  }

  const barbershop: Barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true
    }
  });

  if (!barbershop) {
    return null;
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />
    </div>
  );
};

export default BarbershopDetails;
