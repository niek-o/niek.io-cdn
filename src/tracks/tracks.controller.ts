import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { CreateTrackDto } from "./dto/create-track.dto";
import { TracksService } from "./tracks.service";

@ApiTags("tracks")
@Controller()
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get("/tracks")
  findAll() {
    return this.tracksService.findAll();
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
        buttonColor: { type: "string" },
        buttonTextColor: { type: "string" },
        backgroundColor: { type: "string" },
        iconColor: { type: "string" },
        coverURL: { type: "string" },
        backgroundURL: { type: "string" }
      }
    }
  })
  create(@Body() track: CreateTrackDto) {
    this.tracksService.create(track);
  }
}
