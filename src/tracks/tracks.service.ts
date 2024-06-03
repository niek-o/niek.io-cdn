import { HttpStatus, Injectable } from "@nestjs/common";
import { stat, unlinkSync } from "fs";
import { join } from "path";
import { PrismaService } from "../prisma.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { Track } from "./dto/track.entity";
import { UpdateTrackDto } from "./dto/update-track.dto";

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.track.findMany({
      orderBy: {
        releaseDate: "desc"
      },
      include: {
        links: {
          orderBy: {
            platform: "asc"
          }
        }
      }
    });
  }

  findOne(id: string) {
    return this.prisma.track.findUnique({
      where: {
        id: id
      },
      include: {
        links: {
          where: {
            trackId: id
          },
          orderBy: {
            platform: "asc"
          }
        }
      }
    });
  }

  findAllVisible() {
    return this.prisma.track.findMany({
      where: {
        visible: true
      },
      orderBy: {
        releaseDate: "desc"
      },
      include: {
        links: {
          orderBy: {
            platform: "asc"
          }
        }
      }
    });
  }

  async create(track: CreateTrackDto) {
    const mappedTrack = new Track(track);

    return this.prisma.track.create({
      data: {
        ...mappedTrack,
        links: {
          createMany: { data: track.links }
        }
      }
    });
  }

  async editOne(id: string, track: UpdateTrackDto) {
    return this.prisma.track.update({
      where: {
        id: id
      },
      data: {
        ...track,
        links: {
          deleteMany: {},
          createMany: { data: track.links }
        }
      }
    });
  }

  async publishOne(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id: id
      }
    });

    if (!track) {
      return HttpStatus.NOT_FOUND;
    }

    return this.prisma.track.update({
      where: {
        id: id
      },
      data: {
        visible: !track.visible
      }
    });
  }

  async deleteOne(id: string) {
    const deletedTrack = await this.prisma.track.delete({
      where: {
        id: id
      }
    });

    const rootDir = process.cwd();

    stat(join(rootDir, "images/cover", `${id}.jpg`), (err) => {
      if (err) {
        return;
      }

      unlinkSync(join(rootDir, "images/cover", `${id}.jpg`));
    });

    stat(join(rootDir, "images/background", `${id}.jpg`), (err) => {
      if (err) {
        return;
      }

      unlinkSync(join(rootDir, "images/background", `${id}.jpg`));
    });

    return deletedTrack;
  }
}
