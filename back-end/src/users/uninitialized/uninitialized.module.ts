import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UninitController } from "./uninitialized.controller";
import Uninitialized from "./uninitialized.entity";
import { UninitService } from "./uninitialized.service";

@Module({
    imports: [TypeOrmModule.forFeature([Uninitialized])],
    controllers: [UninitController],
    providers: [UninitService],
    exports: [UninitService],
})
export class UninitModule {}