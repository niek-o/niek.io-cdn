import {
  Controller,
  Get,
  Header,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { ApiKeyGuard } from "../key.guard";
import { AudioService } from "./audio.service";

@Controller("audio")
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Get("/:id")
  @Header("Accept-Ranges", "bytes")
  async getImage(@Param("id") id: string, @Res() res: any) {
    const img = await this.audioService.getAudio(id);

    res.setHeader("Content-Type", "audio/mpeg");
    await res.end(img);
  }

  @Post("/:id")
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
        .addFileTypeValidator({ fileType: "audio/*" })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    )
    file: Express.Multer.File
  ) {
    return await this.audioService.createCover(id, file);
  }
}
