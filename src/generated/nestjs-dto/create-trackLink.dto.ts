
import {MusicPlatform} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class CreateTrackLinkDto {
  url: string;
@ApiProperty({ enum: MusicPlatform})
platform: MusicPlatform;
}
