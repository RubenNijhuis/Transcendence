"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFactory = void 0;
const falso_1 = require("@ngneat/falso");
const typeorm_seeding_1 = require("@concepta/typeorm-seeding");
const typeorm_1 = require("../../typeorm");
class useFactory extends typeorm_seeding_1.Factory {
    async entity() {
        const user = new typeorm_1.User();
        user.username = (0, falso_1.randFullName)();
        return user;
    }
}
exports.useFactory = useFactory;
//# sourceMappingURL=user.factory.js.map