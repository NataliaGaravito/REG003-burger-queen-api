import { Request, Response, NextFunction } from "express";
import productServices from '../services/products.service';
import error from '../middleware/error';
import dotenv from 'dotenv';
dotenv.config();

const getAllProducts = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { page, limit } = req.query;
        const pageNumber = page? +page: 1;
        const limitNumber = limit? +limit : 10;
        const url = process.env.URL+'products?page=';

        if (pageNumber <= 0 || limitNumber <=0) return error(400, req, res, next);

        const fetchedProducts = await productServices.allProducts(Number(pageNumber), Number(limitNumber));
        if (fetchedProducts.pagination.prev !== null) res.links({prev: url+fetchedProducts.pagination.prev}) 
        if (fetchedProducts.pagination.next !== null) res.links({next: url+fetchedProducts.pagination.next})

        return res.links({
            first: url+fetchedProducts.pagination.first,
            last: url+fetchedProducts.pagination.last,
        }).status(200).json({ products: fetchedProducts.allProducts });

    } catch (err) {
        return error(500, req, res, next);
    }
}

const getProductById = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const fetchedProduct = await productServices.productById(Number(id));
        if(fetchedProduct.length === 0) return error({statusCode: 404}, req, res, next);
        return res.status(200).json({product: fetchedProduct});
    } catch (err) {
        return error(500, req, res, next);
    }
}

const deleteProductById = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const deletedProduct = await productServices.deleteProduct(Number(id));
        return res.status(200).json({product: deletedProduct});
    } catch (err) {
        if(err.code === 'P2025') return error({statusCode: 404, message: err.meta.cause}, req, res, next);
        return error(500, req, res, next);
    }
}

const createProduct = async (req:Request, res:Response, next: NextFunction) => {
    const { name, price } = req.body;
    if ((name == undefined) || (price == undefined)) return error(400, req, res, next);
    try {
        const createdProduct = await productServices.createProduct(req.body);
        return res.status(200).json({product: createdProduct});
    } catch (err) {
        return error(500, req, res, next);
    }
}

const updateProduct = async (req:Request, res:Response, next: NextFunction) => {
    if(Object.keys(req.body).length === 0) return error({statusCode: 400}, req, res, next);
    try {
        const { id } = req.params;
        const updatedProduct = await productServices.updateProduct(Number(id), req.body);
        return res.status(200).json({product: updatedProduct});
    } catch (err) {
        if(err.code === 'P2025') return error({statusCode: 404, message: err.meta.cause}, req, res, next);
            return error({statusCode: 400}, req, res, next); 
    }
}

export default { getAllProducts, getProductById, deleteProductById, createProduct, updateProduct }