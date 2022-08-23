import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { env } from 'node:process';
import * as session from 'express-session';
import passport from 'passport';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app: NestExpressApplication = await NestFactory.create(AppModule);
    const port = Number(env.PORT);

    const configService = app.get(ConfigService);
    // Enable cors so the front-end can communicate
    app.enableCors({
        origin: 'http://localhost:8080',
        methods: 'GET, PUT, POST, DELETE',
        allowedHeaders: 'Content-Type, Authorization',
    });
    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true }),
    );
    
    app.setGlobalPrefix('api');
    app.use(session({
    cookie: {
            maxAge: 60000 * 60 * 24,
        },
        secret: "djfhjdhfdjkhfjkhsjk",
        resave: false,
        saveUninitialized: false,
    }))
    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(port, () => {
        console.log('[WEB]', String(env.BASE_URL));
    });
}

bootstrap();
