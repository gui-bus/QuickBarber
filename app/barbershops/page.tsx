import { Barbershop } from "@prisma/client";
import BarbershopItem from "../(home)/_components/barbershop-item";
import { db } from "../_lib/prisma";
import { redirect } from "next/navigation";

interface BarbershopsPageProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  if (!searchParams.search) {
    return redirect("/");
  }

  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        {
          address: {
            contains: searchParams.search,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: searchParams.search,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return (
    <div className="mx-auto w-full max-w-7xl p-5">
      <h1 className="flex items-center gap-2 text-xl font-semibold dark:text-white">
        Exibindo resultados de pesquisa para &quot;{searchParams.search}&quot;
      </h1>

      {barbershops.length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {barbershops.map((barbershop: Barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      ) : (
        <div className="mt-5">
          <p className="text-sm font-light">Oops! Não foi possível encontrar algo com o termo pesquisado.</p>
        </div>
      )}
    </div>
  );
};

export default BarbershopsPage;
