import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const SearchSection = () => {
  return (
    <section className="flex flex-col py-10 px-5  bg-[url('/capa.png')] bg-cover bg-center bg-no-repeat">
      <h2 className="text-xl font-bold">Olá, Guilherme!</h2>
      <p className="text-sm capitalize">
        {format(new Date(), "EEEE',' dd 'de' MMMM", {
          locale: ptBR,
        })}
      </p>
    </section>
  );
};

export default SearchSection;
