import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import express from "express";
import * as fs from "node:fs";
import * as http from "node:http";
import * as https from "node:https";
import { AppModule } from "./app.module";

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Niek.io back-end")
    .setDescription("The back-end server for niek.io")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.init();

  http.createServer(server).listen(4000);

  if (process.env.PRIVATE_KEY_PATH && process.env.CERTIFICATE_PATH) {
    const httpsOptions = {
      key: fs.readFileSync(process.env.PRIVATE_KEY_PATH),
      cert: fs.readFileSync(process.env.CERTIFICATE_PATH)
    };

    https.createServer(httpsOptions, server).listen(4001);
  }
}

bootstrap();
