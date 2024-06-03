import { ApiProperty } from "@nestjs/swagger";
import { MusicPlatform } from "@prisma/client";

export class TrackLinkDto {
  url: string;
  @ApiProperty({ enum: MusicPlatform })
  platform: MusicPlatform;
}
