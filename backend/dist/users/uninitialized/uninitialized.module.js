"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UninitModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const uninitialized_controller_1 = require("./uninitialized.controller");
const uninitialized_entity_1 = require("./uninitialized.entity");
const uninitialized_service_1 = require("./uninitialized.service");
let UninitModule = class UninitModule {
};
UninitModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([uninitialized_entity_1.default])],
        controllers: [uninitialized_controller_1.UninitController],
        providers: [uninitialized_service_1.UninitService],
        exports: [uninitialized_service_1.UninitService],
    })
], UninitModule);
exports.UninitModule = UninitModule;
//# sourceMappingURL=uninitialized.module.js.map