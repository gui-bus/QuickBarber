import Image from "next/image";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { Separator } from "../_components/ui/separator";

interface infoCardProps {
  title: string;
  description: string;
}

const InfoCard = ({ description, title }: infoCardProps) => {
  return (
    <Card className="border-none">
      <CardHeader className="flex items-center rounded-t-xl p-0 py-3 text-center text-xl font-medium text-white bg-neutral-800">
        {title}
      </CardHeader>
      <Separator />
      <CardContent className="dark:bg-background border-2 rounded-b-xl border-neutral-800 border-t-0">
        <CardContent className="p-0 pt-5">
          <p className="text-sm font-light dark:text-white/70 text-center">{description}</p>
        </CardContent>
      </CardContent>
    </Card>
  );
};

const cards = [
  {
    title: "Agendamento simplificado",
    description:
      "Aqui você tem acesso a um processo de agendamento simples e eficiente, permitindo que você reserve seu horário com facilidade.",
  },
  {
    title: "Barbearias de elite",
    description:
      "Explore uma seleção das melhores barbearias parceiras. Encontre ambientes profissionais e qualificados para cuidar do seu visual.",
  },
  {
    title: "Explorando estilos",
    description:
      "A QUICK BARBER oferece uma ampla gama de barbearias parceiras que você possa explorar e encontrar o estilo que mais combina com você.",
  },
];

const AboutSection = () => {
  return (
    <section>
      <Image
        src="/bannerHome.png"
        alt="QUICK BARBER Banner"
        width={0}
        height={0}
        className="h-auto w-full object-cover mb-5"
        sizes="100vw"
      />

      <div className="mx-auto w-full max-w-7xl px-5">
        <div className="flex flex-col items-center justify-center gap-y-4 text-center">
          <h1 className="text-2xl font-bold uppercase md:text-3xl">
            Sua jornada de estilo começa aqui
          </h1>
          <p className="text-sm font-light dark:text-white/70">
            Descubra a praticidade da QUICK BARBER, a plataforma de agendamento
            online que simplifica todo o processo de reserva de horários em
            barbearias.
          </p>
        </div>

        <div className="hidden grid-cols-1 gap-5 pb-10 pt-5 lg:grid md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <InfoCard
              key={card.title}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
