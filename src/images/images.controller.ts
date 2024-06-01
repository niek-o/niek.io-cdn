import { Controller, Get, Header, Param, Query, Res } from "@nestjs/common";
import { readFileSync } from "fs";
import { join } from "path";
import sharp from "sharp";

@Controller("images")
export class ImagesController {
  @Get("/cover/:id")
  @Header("Accept-Ranges", "bytes")
  async getImage(
    @Param("id") id: string,
    @Query("width") width: number,
    @Query("height") height: number,
    @Res() res: any
  ) {
    const rootDir = process.cwd();

    const file = readFileSync(join(rootDir, "images/cover", `${id}.jpg`));

    let img: Buffer;

    if (width > 0 && height > 0) {
      img = await sharp(file).resize(+width, +height).toBuffer();
    } else {
      img = file;
    }

    res.setHeader("Content-Type", "image/jpeg");
    await res.end(img);
  }

  @Get("/background/:id")
  @Header("Accept-Ranges", "bytes")
  async getBackground(
    @Param("id") id: string,
    @Query("width") width: number,
    @Query("height") height: number,
    @Res() res: any
  ) {
    const rootDir = process.cwd();

    const file = readFileSync(join(rootDir, "images/background", `${id}.jpg`));

    let img: Buffer;

    if (width > 0 && height > 0) {
      img = await sharp(file).resize(+width, +height).toBuffer();
    } else {
      img = file;
    }

    res.setHeader("Content-Type", "image/jpeg");
    await res.end(img);
  }
}
