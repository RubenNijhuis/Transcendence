import { Repository } from "typeorm";
import { CreateUninitDto } from "./dtos/CreateUninit.dto";
import Uninitialized from "./uninitialized.entity";
export declare class UninitService {
    private readonly uninitRepo;
    constructor(uninitRepo: Repository<Uninitialized>);
    findUninit(intraId: string): Promise<Uninitialized>;
    createUninit(createUninitDto: CreateUninitDto): Promise<Uninitialized>;
    removeUninit(intraId: string): Promise<import("typeorm").DeleteResult>;
}
