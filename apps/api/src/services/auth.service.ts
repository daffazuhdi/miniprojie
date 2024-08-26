import { ErrorHandler } from "@/helpers/response";
import { generateToken } from "@/lib/jwt";
import prisma from "@/prisma";
import { Prisma, User } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { Request } from "express";

interface IUser{
    id: number;
    phone_number: string;
    gender: string;
    birth_date: Date;
    email: string;
    password?: string;
}


export class AuthService{

    static async login(req: Request){
        const{phone_number, password} = req.body;
        const user = await prisma.user.findUnique({
            where:{
                phone_number:phone_number
            }
        }) as IUser
        if(!user) throw new ErrorHandler("user not found", 404);
        const checkPassword = await compare(password, user.password!);
        if(checkPassword){
            delete user.password;
        }
        else{
            throw new ErrorHandler("wrong password", 400);
        }
        return generateToken(user);
    }

    static async register(req: Request){
        const {email, password, phone_number, gender, birth_date, full_name}:Prisma.UserCreateInput = req.body;
        const hashPassword = await hash(password, 10);
        const data:Prisma.UserCreateInput = {
            email,
            password: hashPassword,
            phone_number,
            gender,
            birth_date: new Date(birth_date),
            full_name,
        }

        return await prisma.user.create({data})
    }
}