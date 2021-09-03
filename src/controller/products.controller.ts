import { Request, Response, NextFunction } from "express";
import productServices from '../services/products.service';
import error from '../middleware/error';
import { Decimal } from "@prisma/client/runtime";

type CreatedProductResponse = {
    id: number
    _id?: string;
    name: string;
    price: Decimal | number;
    image: string;
    type: string;
    dateEntry: Date;
} 

const getAllProducts = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { page, limit } = req.query;
        const pageNumber = page? +page: 1;
        const limitNumber = limit? +limit : 10;
        const url = '/products?page=';

        if (pageNumber <= 0 || limitNumber <=0) return error(400, req, res, next);

        const fetchedProducts = await productServices.allProducts(Number(pageNumber), Number(limitNumber));
        const newFetchedProducts = fetchedProducts.allProducts.map((elem:any) =>{
            elem._id = elem.id.toString();
            elem.price = +elem.price;
            delete elem.id
            return elem
        })
        if (fetchedProducts.pagination.prev !== null) res.links({prev: url+fetchedProducts.pagination.prev}) 
        if (fetchedProducts.pagination.next !== null) res.links({next: url+fetchedProducts.pagination.next})

        return res.links({
            first: url+fetchedProducts.pagination.first,
            last: url+fetchedProducts.pagination.last,
        }).status(200).json(newFetchedProducts);

    } catch (err) {
        return error(500, req, res, next);
    }
}

const getProductById = async (req:Request, res:Response, next: NextFunction) => {
    const { id } = req.params;
    const isNan = isNaN(Number(id));
    if(isNan) return error({statusCode: 404}, req, res, next);
    try {
        const fetchedProduct = await productServices.productById(Number(id));
        if(fetchedProduct.length === 0) return error({statusCode: 404}, req, res, next);
        const responseProduct:CreatedProductResponse = { ...fetchedProduct[0] }
        responseProduct._id = fetchedProduct[0].id.toString();
        responseProduct.price = +responseProduct.price;
        delete responseProduct.id
        return res.status(200).json(responseProduct);
    } catch (err) {
        return error(500, req, res, next);
    }
}

const deleteProductById = async (req:Request, res:Response, next: NextFunction) => {
    const { id } = req.params;
    const idNumber = +id;
    if(idNumber >= 2147483647) return error({statusCode: 404}, req, res, next)
    const isNan = isNaN(Number(id));
    if(isNan) return error({statusCode: 404}, req, res, next);
    try {
        const deletedProduct = await productServices.deleteProduct(Number(id));
        const responseProduct:CreatedProductResponse = { ...deletedProduct }
        responseProduct._id = deletedProduct.id.toString();
        responseProduct.price = +responseProduct.price;
        delete responseProduct.id
        return res.status(200).json(responseProduct);
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
        const responseProduct:CreatedProductResponse = { ...createdProduct }
        responseProduct._id = createdProduct.id.toString();
        responseProduct.price = +responseProduct.price;
        delete responseProduct.id
        return res.status(200).json(responseProduct);
    } catch (err) {
        return error(500, req, res, next);
    }
}

const updateProduct = async (req:Request, res:Response, next: NextFunction) => {
    const { id } = req.params;
    const idNumber = +id;
    if(idNumber >= 2147483647) return error({statusCode: 404}, req, res, next)
    if(Object.keys(req.body).length === 0) return error({statusCode: 400}, req, res, next);
    try {
        const updatedProduct = await productServices.updateProduct(Number(id), req.body);
        const responseProduct:CreatedProductResponse = { ...updatedProduct }
        responseProduct._id = updatedProduct.id.toString();
        responseProduct.price = +responseProduct.price;
        delete responseProduct.id
        return res.status(200).json(responseProduct);
    } catch (err) {
        if(err.code === 'P2025') return error({statusCode: 404, message: err.meta.cause}, req, res, next);
            return error({statusCode: 400}, req, res, next); 
    }
}

export default { getAllProducts, getProductById, deleteProductById, createProduct, updateProduct }