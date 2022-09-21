"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const Joi = require("joi");
const configSchema = Joi.object({
    FORTYTWO_APP_ID: Joi.string().required(),
    FORTYTWO_APP_SECRET: Joi.string().required(),
    FORTYTWO_CALLBACK_URL: Joi.string().required(),
    INTRA_AUTH_URL: Joi.string().required(),
    INTRA_TOKEN_URL: Joi.string().required(),
    INTRA_GET_ME_URL: Joi.string().required(),
    CALLBACK: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASS: Joi.string().required(),
    DB_NAME: Joi.string().required(),
});
exports.envConfig = {
    envFilePath: ['.env'], validationSchema: configSchema,
};
//# sourceMappingURL=env.config.js.map