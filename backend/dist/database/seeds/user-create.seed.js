"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeeder = void 0;
const typeorm_seeding_1 = require("@concepta/typeorm-seeding");
const user_factory_1 = require("../factories/user.factory");
class UserSeeder extends typeorm_seeding_1.Seeder {
    async run() {
        const userfact = this.factory(user_factory_1.useFactory);
        for (var i = 1; i <= 200; i++) {
            var user = await userfact.make({ rank: i });
            await userfact.save(user);
        }
    }
}
exports.UserSeeder = UserSeeder;
//# sourceMappingURL=user-create.seed.js.map