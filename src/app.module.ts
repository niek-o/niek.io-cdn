import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AudioModule } from "./audio/audio.module";
import { ImagesModule } from "./images/images.module";
import { PrismaService } from "./prisma.service";
import { TracksModule } from "./tracks/tracks.module";

@Module({
  imports: [TracksModule, ImagesModule, AudioModule],
  controllers: [AppController],
  providers: [AppService, PrismaService]
})
export class AppModule {}
