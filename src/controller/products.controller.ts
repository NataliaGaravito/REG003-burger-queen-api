import { Request, Response } from "express";
import productServices from '../services/products.service';
import dotenv from 'dotenv';
dotenv.config();

const getAllProducts = async (req:Request, res:Response) => {
    try {
        const { page, limit } = req.query;
        const pageNumber = page? +page: 1;
        const limitNumber = limit? +limit : 10;
        const url = process.env.URL+'products?page=';

        if (pageNumber <= 0 || limitNumber <=0) return res.status(400).json({errorMessage: "Invalid page/limit value"});

        const fetchedProducts = await productServices.allProducts(Number(pageNumber), Number(limitNumber));
        if (fetchedProducts.pagination.prev !== null) res.links({prev: url+fetchedProducts.pagination.prev}) 
        if (fetchedProducts.pagination.next !== null) res.links({next: url+fetchedProducts.pagination.next})

        return res.links({
            first: url+fetchedProducts.pagination.first,
            last: url+fetchedProducts.pagination.last,
        }).status(200).json({ products: fetchedProducts.allProducts });

    } catch (err) {
        return res.status(500).json({ message: 'Products not found!', error: err.message })
    }
}

const getProductById = async (req:Request, res:Response) => {
    try {
        const { id } = req.params
        const fetchedProduct = await productServices.productById(Number(id));
        return res.status(200).json({product: fetchedProduct});
    } catch (err) {
        return res.status(500).json({ message: 'Product not found!', error: err.message })
    }
}

const deleteProductById = async (req:Request, res:Response) => {
    try {
        const { id } = req.params
        const deletedProduct = await productServices.deleteProduct(Number(id));
        return res.status(200).json({product: deletedProduct});
    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong, try again', error: err.message })
    }
}

const createProduct = async (req:Request, res:Response) => {
    try {
        const { name, price, image, type } = req.body;
        const createdProduct = await productServices.createProduct(String(name), Number(price), String(image), Number(type));
        return res.status(200).json({product: createdProduct});
    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong, try again', error: err.message })
    }
}

const updateProduct = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const updatedProduct = await productServices.updateProduct(Number(id), req.body);
        return res.status(200).json({product: updatedProduct});
    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong, try again', error: err.message })
    }
}

export default { getAllProducts, getProductById, deleteProductById, createProduct, updateProduct }