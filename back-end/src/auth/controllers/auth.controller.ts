import { HttpService } from "@nestjs/axios";
import { Controller, Get, Post, Query, Res, UseGuards } from "@nestjs/common";
import { ADDRCONFIG } from "dns";
import { Response } from "express";
import { FortyTwoAuthGuard } from "src/auth/guard";
import { User } from "src/typeorm";
import { AuthService } from "../services/auth.service";

import Axios from "axios";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    // @UseGuards(FortyTwoAuthGuard)
    @Get("login?")
    login(@Query("token") token: string) {
        console.log("TOKEHN: ", token);
        grant_type = client_credentials
        
        client_id = MY_AWESOME_UID
        client_secret = MY_AWESOME_SECRET"

        Axios.post("https://api.intra.42.fr/oauth/authorize", {
            grant_type: 
        });
    }

    @Get("42/callback")
    @UseGuards(FortyTwoAuthGuard)
    redirect(@Res() res: Response) {
        res.sendStatus(200);
    }

    @Get("status")
    status() {}

    @Get("logout")
    logout() {}

    @Post("singup")
    signup() {
        return this.authService.signup;
    }

    @Post("singin")
    signin() {
        return this.authService.signin;
    }
}
