const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const images = [
      "https://utfs.io/f/32057fd0-feb1-4fac-91ba-9d2054dfc5cd-16u.png",
      "https://utfs.io/f/6dc5aa11-e8cd-40af-8e8a-b75e762fdcd9-17n.png",
      "https://utfs.io/f/164faf88-90ea-44f4-9e4d-2d1e5229ad90-18e.png",
      "https://utfs.io/f/e061f4d3-ee8d-483b-9530-62f7ed99d6bb-17l.png",
      "https://utfs.io/f/9184642c-b700-4f86-80f4-8b0cd5a59b79-16v.png",
      "https://utfs.io/f/0b5b6ec9-98a1-4e93-ade0-3adb4ef92e03-16s.png",
      "https://utfs.io/f/6e4507ab-e3b4-4c3f-b678-fb1f0a079f67-17o.png",
      "https://utfs.io/f/cca37a9e-0af4-4575-b3c1-81f8b2262cc0-16w.png",
      "https://utfs.io/f/1912624c-070e-4af5-bea2-c7f4f6169568-17k.png",
      "https://utfs.io/f/b1f48f27-9e2e-4bd8-95db-b049fb52afb2-17q.png",
      "https://utfs.io/f/6dc5aa11-e8cd-40af-8e8a-b75e762fdcd9-17n.png",
      "https://utfs.io/f/380ead77-1ac2-4598-b39a-2e76e4627cf6-16r.png",
      "https://utfs.io/f/7657e8a9-1c3b-4ac4-bf37-24b276326692-17j.png",
      "https://utfs.io/f/4a0ae619-8c57-47ef-88eb-65ee2b0000f6-17r.png",
      "https://utfs.io/f/ce851a2f-213c-48ab-902e-e3a3646e1462-17s.png",
      "https://utfs.io/f/3f3257d5-654a-4f54-9516-35d6448320e4-16x.png",
      "https://utfs.io/f/d89212c5-ce96-407d-bcac-ddc417910557-17p.png",
      "https://utfs.io/f/33562ce4-5984-40ce-bfe4-4162606f5bbd-17m.png",
      "https://utfs.io/f/a5f3242d-a02a-40fa-acab-bd8c1ee5aab4-16p.png",
      "https://utfs.io/f/e172bf2e-5276-42d4-ae5f-4a82be5723a8-16q.png",
    ];

    const creativeNames = [
      "Barbearia Retro",
      "Estilo Cortante",
      "Navalha & Corte",
      "The Stylish Barber",
      "Cabelo & Charme",
      "Lâmina & Estilo",
      "Barbearia Chique",
      "Aparência Sofisticada",
      "Urbano & Elegante",
      "Estilo Tradicional",
      "Barbearia Vanguarda",
      "Visão Barbuda",
      "Elegância dos Cortes",
      "Barba Fina",
      "Corte Nobre",
      "Máquina & Estilo",
      "Cabelo Vintage",
      "Cortes de Luxo",
      "A Arte da Barbearia",
      "Estilo Barbeiro",
      "Barbearia Moderna",
      "Refinamento Capilar",
      "Visão Barbuda",
      "Corte com Estilo",
      "A Navalha Dourada",
      "Barba & Estilo",
      "Estilo Clássico",
      "Estilo em Foco",
      "A Barba do Mestre",
    ];

    const addresses = [
      "Rua dos Ipês, 123",
      "Avenida das Palmeiras, 456",
      "Praça dos Girassóis, 789",
      "Travessa das Violetas, 101",
      "Alameda das Acácias, 202",
      "Estrada dos Pinheiros, 303",
      "Avenida das Orquídeas, 404",
      "Praça dos Lírios, 505",
      "Rua das Azaleias, 606",
      "Avenida das Magnólias, 707",
      "Rua das Hortênsias, 808",
      "Avenida dos Flamboyants, 909",
      "Praça das Amendoeiras, 1010",
      "Travessa das Goiabeiras, 1111",
      "Alameda das Pitangueiras, 1212",
      "Estrada dos Jacarandás, 1313",
    ];

    const services = [
      {
        name: "Corte de Cabelo",
        description:
          "Estilo personalizado alinhado com as últimas tendências da moda.",
        price: 40.0,
        imageUrl:
          "https://utfs.io/f/4423494d-6a24-41f7-b6a8-eb8f97f461fe-16p.png",
      },
      {
        name: "Corte de Cabelo Longo (Masculino)",
        description:
          "Estilo exclusivo para cabelos longos, criando looks impressionantes.",
        price: 45.0,
        imageUrl:
          "https://utfs.io/f/92274aed-b62e-453f-871c-3d794f145235-16u.png",
      },
      {
        name: "Corte Infantil",
        description:
          "Cortes adoráveis para os pequenos, proporcionando uma experiência agradável.",
        price: 40.0,
        imageUrl:
          "https://utfs.io/f/366762c8-f942-4693-af06-de096bb88274-16x.png",
      },
      {
        name: "Corte Raspado",
        description:
          "Visual ousado com corte rente para um estilo moderno e distinto.",
        price: 30.0,
        imageUrl:
          "https://utfs.io/f/49c04fb1-2f7b-4501-b6a5-d94f11fa4434-16w.png",
      },
      {
        name: "Barba",
        description:
          "Modelagem completa destacando a masculinidade, com detalhes precisos.",
        price: 30.0,
        imageUrl:
          "https://utfs.io/f/86029b35-908b-4eb6-9958-730f5428fb81-16q.png",
      },
      {
        name: "Barba Longa",
        description:
          "Modelagem especializada para barbas mais compridas, criando looks distintos.",
        price: 40.0,
        imageUrl:
          "https://utfs.io/f/30e506a6-e208-4568-b4ea-52299babcee4-16v.png",
      },
      {
        name: "Barba Desenhada",
        description:
          "Barba desenhada com precisão para um visual único e refinado.",
        price: 45.0,
        imageUrl:
          "https://utfs.io/f/6623ad84-653c-407d-97fd-d2f81462dad4-17j.png",
      },
      {
        name: "Sobrancelha",
        description:
          "Modelagem precisa realçando a expressão facial de forma definida.",
        price: 20.0,
        imageUrl:
          "https://utfs.io/f/5f236002-0e31-4c33-9c6c-da900147bb04-16t.png",
      },
      {
        name: "Hidratação (Cabelo)",
        description:
          "Revitalização profunda para cabelos, proporcionando brilho e maciez.",
        price: 25.0,
        imageUrl:
          "https://utfs.io/f/e2cf66f5-2683-42c0-9e14-0703759236b6-16r.png",
      },
      {
        name: "Hidratação (Barba)",
        description:
          "Cuidados especiais para a barba, mantendo-a saudável e suave.",
        price: 20.0,
        imageUrl:
          "https://utfs.io/f/eeba5e0f-1f06-43e7-afdd-4de6afdf4464-16s.png",
      },
      {
        name: "Cabelo + Barba",
        description:
          "Experiência completa de transformação para um visual harmonioso.",
        price: 70.0,
        imageUrl:
          "https://utfs.io/f/c4573a61-e342-4461-91db-2ddce1132932-17k.png",
      },
      {
        name: "Cabelo + Barba + Bigode",
        description:
          "Pacote completo para um visual marcante que reflete sua personalidade única.",
        price: 80.0,
        imageUrl:
          "https://utfs.io/f/6e56e7b1-a553-479b-af97-53fcc58978f0-17l.png",
      },
    ];

    const barbershops = [];
    for (let i = 0; i < 16; i++) {
      const name = creativeNames[i];
      const address = addresses[i];
      const imageUrl = images[i];

      const barbershop = await prisma.barbershop.create({
        data: {
          name,
          address,
          imageUrl: imageUrl,
          phone: "(12)9 9999-9999",
        },
      });

      for (const service of services) {
        await prisma.service.create({
          data: {
            name: service.name,
            description: service.description,
            price: service.price,
            barbershop: {
              connect: {
                id: barbershop.id,
              },
            },
            imageUrl: service.imageUrl,
          },
        });
      }

      barbershops.push(barbershop);
    }

    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar as barbearias:", error);
  }
}

seedDatabase();
