import { ValidationPipe } from "@nestjs/common";

export const pipenConfig = new ValidationPipe({
    whitelist: true,
    transform: true,
});