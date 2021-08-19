import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const allProducts = async (page:number, limit:number) => {
    try {
        // const limitPage = limit ? limit : 10;
        const skip = (page-1) * limit;
        const offset = page * limit;
        const productsCount = await prisma.products.count();
        // const last = Math.trunc(productsCount + limit - 1) / limit;
        const allProducts = await prisma.products.findMany({
            skip: skip,
            take: limit
        })
        let pagination = {
            next: offset < productsCount ? page + 1: null,
            prev: skip > 0 ? page - 1 : null,
            first: 1,
            last : Math.trunc((productsCount + limit - 1) / limit)
        }
        return { allProducts, pagination };
    } catch (e) {
        throw new Error(e.message)
    }
}

const productById = async (id: number) => {
    try {
        const product = await prisma.products.findMany({
            where: { id: Number(id) },
        })
        return (product);
    } catch (e) {
        throw new Error(e.message)
    }
}

const deleteProduct = async (id: number) => {
    try {
        const product = await prisma.products.delete({
            where: { id: Number(id) },
        })
        return (product);
    } catch (error) {
        throw new Error(error.message)
    }
}

const createProduct =  async (name: string, price: number, image: string, type:number) => {
    try {
        const result = await prisma.products.create({
            data: {
                name,
                price,
                image,
                type: {
                    connect: {
                        id: Number(type)
                    }
                },
                
            },
        })
        return (result);
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateProduct = async (id: number, data:any) => {
    try {    
        const user = await prisma.products.update({
            where: { id },
            data
        })
        return(user);
    } catch (error) {
        throw new Error(error.message)
    }
} 

export default { allProducts, productById, deleteProduct, createProduct, updateProduct};