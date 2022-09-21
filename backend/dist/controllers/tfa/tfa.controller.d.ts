import { Response } from "express";
import { TfaDto, UsernameDto } from "src/dtos/auth";
import { TfaService } from "src/services/tfa/tfa.service";
export declare class TfaController {
    private readonly tfaService;
    constructor(tfaService: TfaService);
    google2fa(userDto: UsernameDto): Promise<any>;
    authenticate(res: Response, tfaDto: TfaDto): Promise<void>;
}
