"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const node_process_1 = require("node:process");
const session = require("express-session");
const passport = require("passport");
const app_config_1 = require("./configs/app.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = Number(node_process_1.env.PORT);
    app.enableCors(app_config_1.corsConfig);
    app.useGlobalPipes(app_config_1.pipenConfig);
    app.use(session(app_config_1.sessionConfig));
    app.setGlobalPrefix("api");
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    await app.listen(port, () => {
        console.log("[WEB]", String(node_process_1.env.BASE_URL));
    });
}
bootstrap();
//# sourceMappingURL=main.js.map