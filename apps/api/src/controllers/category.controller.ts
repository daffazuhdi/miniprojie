import { CategoryService } from "@/services/category.service";
import { NextFunction, Request, Response } from "express"
export class CategoryController{

    async get(req: Request, res: Response, next:NextFunction) {
        try {
            const data = await CategoryService.getAllService();
            return res.status(200).json({message:'get categories success', data, success: true});
            
        } catch (error) {
            next(error)
        }

    }

    async create(req: Request, res: Response, next:NextFunction) {

        try {
            await CategoryService.createService(req);
            return res.status(201).json({message:'create category success'});
            
        } catch (error) {
            next(error)
        }

    }
}