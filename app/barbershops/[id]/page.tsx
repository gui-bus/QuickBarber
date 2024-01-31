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
  });

  if (!barbershop) {
    return null;
  }

  return <BarbershopInfo barbershop={barbershop} />;
};

export default BarbershopDetails;
