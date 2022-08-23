import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { env } from 'node:process';

async function bootstrap() {
    const app: NestExpressApplication = await NestFactory.create(AppModule);
    const port = Number(env.PORT);

    // Enable cors so the front-end can communicate
    app.enableCors({
        origin: 'http://localhost:8080',
        methods: 'GET, PUT, POST, DELETE',
        allowedHeaders: 'Content-Type, Authorization',
    });
    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true }),
    );

    await app.listen(port, () => {
        console.log('[WEB]', String(env.BASE_URL));
    });
}

bootstrap();