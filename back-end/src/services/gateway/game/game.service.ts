import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class GameSocketService {
    constructor() { }

    testService(testString: string): string {
        return testString
    }
}
