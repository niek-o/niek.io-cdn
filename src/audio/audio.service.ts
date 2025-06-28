import { HttpStatus, Injectable } from "@nestjs/common";
import { createWriteStream, readFileSync, unlinkSync } from "fs";
import { convertAndSaveAudio } from "light-audio-converter";
import { extname, join } from "path";

const ACCEPTED_FILE_TYPES = [".mp3", ".wav", ".flac"];

@Injectable()
export class AudioService {
  constructor() { }

  async getAudio(id: string) {
    const rootDir = process.cwd();

    return readFileSync(join(rootDir, "audio", `${id}.mp3`));
  }

  async createCover(id: string, file: Express.Multer.File) {
    const rootDir = process.cwd();

    const ext = extname(file.originalname);

    if (!ACCEPTED_FILE_TYPES.includes(ext)) {
      return HttpStatus.UNPROCESSABLE_ENTITY;
    }

    const filePath = join(rootDir, "audio", `${id}${ext}`);

    await this.writeFile(filePath, file);

    if (ext === ".mp3") {
      return HttpStatus.CREATED;
    }

    const outputFilePath = join(rootDir, "audio", `${id}.mp3`);

    await convertAndSaveAudio(filePath, "mp3", outputFilePath);

    unlinkSync(filePath);

    return HttpStatus.CREATED;
  }

  async writeFile(filePath: string, file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const writeStream = createWriteStream(filePath);

      writeStream.on("error", () => reject());
      writeStream.on("finish", () => resolve(null));

      writeStream.end(file.buffer);
    });
  }
}
