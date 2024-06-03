import {
  Controller,
  Get,
  Header,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { ApiKeyGuard } from "../key.guard";
import { ImagesService } from "./images.service";

@Controller("images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get("/cover/:id")
  @Header("Accept-Ranges", "bytes")
  async getImage(
    @Param("id") id: string,
    @Query("width") width: number,
    @Query("height") height: number,
    @Res() res: any
  ) {
    const img = await this.imagesService.getCover(id, height, width);

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
    const img = await this.imagesService.getBackground(id, height, width);

    res.setHeader("Content-Type", "image/jpeg");
    await res.end(img);
  }

  @Post("/cover/:id")
  @UseGuards(ApiKeyGuard)
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" }
      }
    }
  })
  async createCover(
    @Param("id") id: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: "image/jpeg" })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    )
    file: Express.Multer.File
  ) {
    return await this.imagesService.createCover(id, file);
  }

  @Post("/background/:id")
  @UseGuards(ApiKeyGuard)
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" }
      }
    }
  })
  async createBackground(
    @Param("id") id: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: "image/jpeg" })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    )
    file: Express.Multer.File
  ) {
    return await this.imagesService.createBackground(id, file);
  }
}
