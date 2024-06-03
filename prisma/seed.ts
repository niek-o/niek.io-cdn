import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const anotherDay = await prisma.track.upsert({
    where: { id: "another-day" },
    update: {},
    create: {
      id: "another-day",
      title: "ANOTHER DAY",
      subtitle: "NIEK & LUWUC",
      backgroundColor: "#1a1437",
      accentColor: "#f1d4fa",
      backgroundImage: false,
      releaseDate: new Date(),
      visible: true,
      links: {
        create: [
          {
            url: "https://www.youtube.com/watch?v=iq0C2pgGnrc",
            platform: "youtube"
          },
          {
            url: "https://open.spotify.com/track/7rauCEF41dYR63AfvypaKe",
            platform: "spotify"
          }
        ]
      }
    }
  });

  const holdMeNow = await prisma.track.upsert({
    where: { id: "hold-me-now" },
    update: {},
    create: {
      id: "hold-me-now",
      title: "HOLD ME NOW",
      subtitle: "SINGLE",
      backgroundColor: "#FFFFFF",
      accentColor: "#FF0000",
      backgroundImage: true,
      releaseDate: new Date(),
      visible: false,
      links: {
        create: [
          {
            url: "https://www.youtube.com/watch?v=PVvxr3YJdNM",
            platform: "youtube"
          },
          {
            url: "https://open.spotify.com/album/5JKLq88LAWkYA1LZtRmBvf",
            platform: "spotify"
          },
          {
            url: "https://soundcloud.com/gmafiarecords/niek-hold-me-now-original-mix",
            platform: "soundcloud"
          }
        ]
      }
    }
  });

  console.log(anotherDay, holdMeNow);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
