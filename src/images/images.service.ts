import { HttpStatus, Injectable } from "@nestjs/common";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import sharp from "sharp";
import { PrismaService } from "../prisma.service";

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  async getCover(id: string, height: number, width: number) {
    const rootDir = process.cwd();

    const file = readFileSync(join(rootDir, "images/cover", `${id}.jpg`));

    let img: Buffer;

    if (width > 0 && height > 0) {
      img = await sharp(file).resize(+width, +height).toBuffer();
    } else {
      img = file;
    }

    return img;
  }

  async getBackground(id: string, height: number, width: number) {
    const rootDir = process.cwd();

    const file = readFileSync(join(rootDir, "images/background", `${id}.jpg`));

    let img: Buffer;

    if (width > 0 && height > 0) {
      img = await sharp(file).resize(+width, +height).toBuffer();
    } else {
      img = file;
    }

    return img;
  }

  async createCover(id: string, file: Express.Multer.File) {
    const rootDir = process.cwd();

    writeFileSync(join(rootDir, "images/cover", `${id}.jpg`), file.buffer);

    return HttpStatus.CREATED;
  }

  async createBackground(id: string, file: Express.Multer.File) {
    this.prisma.track.update({
      where: { id: id },
      data: { backgroundImage: true }
    });

    const rootDir = process.cwd();

    writeFileSync(join(rootDir, "images/background", `${id}.jpg`), file.buffer);

    return HttpStatus.CREATED;
  }
}
