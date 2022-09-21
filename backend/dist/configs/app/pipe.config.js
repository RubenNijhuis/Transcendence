"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipenConfig = void 0;
const common_1 = require("@nestjs/common");
exports.pipenConfig = new common_1.ValidationPipe({
    whitelist: true,
    transform: true,
});
//# sourceMappingURL=pipe.config.js.map