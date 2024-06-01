import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TracksModule } from "./tracks/tracks.module";
import { ImagesController } from './images/images.controller';

@Module({
  imports: [TracksModule],
  controllers: [AppController, ImagesController],
  providers: [AppService]
})
export class AppModule {}
