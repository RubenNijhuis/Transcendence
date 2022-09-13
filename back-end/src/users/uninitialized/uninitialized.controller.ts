import { Controller } from "@nestjs/common";
import { UninitService } from "./uninitialized.service";

@Controller("Uninitialized")
export class UninitController {
    constructor(private readonly uninitServive: UninitService) {}
}