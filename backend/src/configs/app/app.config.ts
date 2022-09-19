import { ValidationPipe } from "@nestjs/common";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { SessionOptions } from "express-session";

export const corsConfig: CorsOptions = {
    origin: 'http://localhost:8080',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
};

export const pipenConfig = new ValidationPipe({
    whitelist: true,
    transform: true,
});

export const sessionConfig: SessionOptions = {
    cookie: {
        maxAge: 60000 * 60 * 24,
    },
    secret: 'jdsjfkldjfkld', //keep this an actual secret pls!!
    resave: false,
    saveUninitialized: false,
};
