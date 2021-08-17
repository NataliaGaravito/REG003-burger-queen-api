import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const allProducts = async () => {
    try {
        const allProducts = await prisma.products.findMany()
        return allProducts;
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