"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionConfig = exports.pipenConfig = exports.corsConfig = void 0;
const common_1 = require("@nestjs/common");
exports.corsConfig = {
    origin: 'http://localhost:8080',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
};
exports.pipenConfig = new common_1.ValidationPipe({
    whitelist: true,
    transform: true,
});
exports.sessionConfig = {
    cookie: {
        maxAge: 60000 * 60 * 24,
    },
    secret: 'jdsjfkldjfkld',
    resave: false,
    saveUninitialized: false,
};
//# sourceMappingURL=app.config.js.map