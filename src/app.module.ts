import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ImagesModule } from "./images/images.module";
import { PrismaService } from "./prisma.service";
import { TracksModule } from "./tracks/tracks.module";

@Module({
  imports: [TracksModule, ImagesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService]
})
export class AppModule {}
