import { Router } from "express";
import productsService from "../services/products.service.js";

const app=Router()

export default app.get('/',async(req,res)=>{
    res.json({
        status:'OK',
        ...await productsService.toGetProducts()
    })
})