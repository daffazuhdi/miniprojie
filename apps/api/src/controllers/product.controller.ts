import { ProductService } from "@/services/product.service";
import { NextFunction, Request, Response } from "express"
export class ProductController{

    async get(req: Request, res: Response, next:NextFunction) {
        try {
            const data = await ProductService.getAllService(req);
            return res.status(200).json({message:'get categories success', data, success: true});
        } catch (error) {
            next(error)
        }
    }

    async create(req: Request, res: Response, next:NextFunction) {
        try {
            await ProductService.createService(req);
            return res.status(201).json({message:'create category success', success: true});
        } catch (error) {
            next(error)
        }
    }
}