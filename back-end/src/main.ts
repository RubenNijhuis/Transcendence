import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { env } from "node:process";
import * as session from "express-session";
import * as passport from "passport";
import { corsConfig, pipenConfig, sessionConfig } from "src/configs";
import { AppModule } from "./bootstrap/app.module";

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const port = Number(env.PORT);

  // Enable cors so the front-end can communicate
  app.enableCors(corsConfig);
  app.useGlobalPipes(pipenConfig);
  app.use(session(sessionConfig));
  app.setGlobalPrefix("api");
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    // why does this fix the "Error: Failed to serialize user into session"?
    done(null, user);
  });
  await app.listen(port, () => {
    console.log("[WEB]", String(env.BASE_URL));
  });
}

bootstrap();
