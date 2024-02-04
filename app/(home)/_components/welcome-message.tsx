"use client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSession } from "next-auth/react";

const WelcomeMessage = () => {
  const { data, status } = useSession();

  return (
    <div className="flex flex-col text-white">
      {status === "authenticated" ? (
        <h2 className="text-xl">
          Olá, <span className="font-bold">{data?.user?.name}!</span>
        </h2>
      ) : (
        <h2 className="text-xl">
          Olá, <span className="font-bold">faça seu login!</span>
        </h2>
      )}
      <p className="text-sm font-light text-white/70">
        {`Hoje é ${format(new Date(), "EEEE', dia' dd 'de' MMMM", {
          locale: ptBR,
        })}`}
        .
      </p>
    </div>
  );
};

export default WelcomeMessage;
