import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateTrackDto } from "./dto/create-track.dto";

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.track.findMany();
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
          }
        }
      }
    });
  }

  create(track: CreateTrackDto) {
    return this.prisma.track.create({ data: track });
  }
}
