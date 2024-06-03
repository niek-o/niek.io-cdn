import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards
} from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApiKeyGuard } from "../key.guard";
import { CreateTrackDto } from "./dto/create-track.dto";
import { TracksService } from "./tracks.service";

@ApiTags("tracks")
@Controller()
@UseGuards(ApiKeyGuard)
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get("/tracks")
  findAll() {
    return this.tracksService.findAll();
  }

  @Get("/tracks/visible")
  findAllVisible() {
    return this.tracksService.findAllVisible();
  }

  @Get("/track/:id")
  findOne(@Param("id") id: string) {
    return this.tracksService.findOne(id);
  }

  @Post("/track")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        title: { type: "string" },
        subtitle: { type: "string" },
        backgroundColor: { type: "string" },
        accentColor: { type: "string" },
        backgroundImage: { type: "boolean" },
        releaseDate: { type: "string", format: "date-time" },
        links: {
          type: "array",
          items: {
            type: "object",
            properties: {
              url: { type: "string" },
              platform: { type: "string" }
            }
          }
        }
      }
    }
  })
  create(@Body() track: CreateTrackDto) {
    return this.tracksService.create(track);
  }

  @Put("/track/:id")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        backgroundColor: { type: "string" },
        accentColor: { type: "string" },
        backgroundImage: { type: "boolean" },
        releaseDate: { type: "string", format: "date-time" },
        links: {
          type: "array",
          items: {
            type: "object",
            properties: {
              url: { type: "string" },
              platform: { type: "string" }
            }
          }
        }
      }
    }
  })
  editOne(@Body() track: CreateTrackDto, @Param("id") id: string) {
    return this.tracksService.editOne(id, track);
  }

  @Patch("/track/:id/publish")
  publishOne(@Param("id") id: string) {
    return this.tracksService.publishOne(id);
  }

  @Delete("/track/:id")
  deleteOne(@Param("id") id: string) {
    return this.tracksService.deleteOne(id);
  }
}
