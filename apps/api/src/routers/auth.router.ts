import { AuthController } from "@/controllers/auth.controller";
import { Router } from "express";

export class AuthRouter{
    private router = Router();
    private authController = new AuthController();

    constructor(){
        this.routes();
    }
    private routes(){
        this.router.post('/v1', this.authController.login);
        this.router.post('/v2', this.authController.register);
    }

    getRouter(){
        return this.router;
    }
}