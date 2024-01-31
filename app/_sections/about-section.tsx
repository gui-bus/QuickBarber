import Image from "next/image";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { Separator } from "../_components/ui/separator";

const AboutSection = () => {
  return (
    <section>
      <Image
        src="/banner.png"
        alt="QUICK BARBER Banner"
        width={0}
        height={0}
        className="h-auto w-full object-cover"
        sizes="100vw"
      />

      <div className="mx-auto w-full max-w-7xl px-5">
        <div className="flex flex-col items-center justify-center gap-y-4 p-5 text-center">
          <h1 className="text-3xl font-bold uppercase md:text-4xl">
            Sua jornada de estilo começa aqui
          </h1>
          <h2>
            A QUICK BARBER é uma plataforma de agendamento online para
            barbearias que simplifica o processo de reserva de horários.
          </h2>

          <p className="mx-auto w-full max-w-4xl rounded-bl-2xl rounded-tr-2xl border border-primary p-5">
            Descubra as melhores barbearias, agende diversos tipos de serviços,
            explore estilos únicos e mergulhe na praticidade de um agendamento
            simplificado.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 pb-10 pt-5 md:grid-cols-2">
          <Card>
            <CardHeader className="flex items-center rounded-t-xl bg-primary text-xl font-bold text-white">
              Agendamento simplificado
            </CardHeader>
            <Separator />
            <CardContent>
              <CardContent className="p-5">
                <p className="text-center text-sm">
                  Com a QUICK BARBER, você tem acesso a um processo de
                  agendamento simples e eficiente, permitindo que você reserve
                  seu horário com facilidade.
                </p>
              </CardContent>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center rounded-t-xl bg-primary text-xl font-bold text-white">
              Explorando estilos
            </CardHeader>
            <Separator />
            <CardContent>
              <CardContent className="p-5">
                <p className="text-center text-sm">
                  A QUICK BARBER oferece uma ampla gama de barbearias parceiras
                  que você possa explorar e encontrar o estilo que mais combina
                  com você.
                </p>
              </CardContent>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
