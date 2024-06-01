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
      buttonColor: "#578196",
      buttonTextColor: "#f3d6fc",
      backgroundColor: "#1a1437",
      iconColor: "#f1d4fa",
      backgroundImage: false,
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
      buttonColor: "#FF0000",
      buttonTextColor: "#FFFFFF",
      backgroundColor: "#FFFFFF",
      iconColor: "#FF0000",
      backgroundImage: true,
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
