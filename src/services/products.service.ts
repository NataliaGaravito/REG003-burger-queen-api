import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const allProducts = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const offset = page * limit;
    const productsCount = await prisma.products.count();
    const allProducts = await prisma.products.findMany({
        skip: skip,
        take: limit
    })
    let pagination = {
        next: offset < productsCount ? page + 1 : null,
        prev: skip > 0 ? page - 1 : null,
        first: 1,
        last: Math.trunc((productsCount + limit - 1) / limit)
    }
    return { allProducts, pagination };
}

const productById = async (id: number) => {
    const product = await prisma.products.findMany({
        where: { id: Number(id) },
    })
    return (product);
}

const deleteProduct = async (id: number) => {
    const product = await prisma.products.delete({
        where: { id: Number(id) },
    })
    return (product);
}

const createProduct = async (data:any) => {
    const result = await prisma.products.create({
        data
    })
    return (result);
}

const updateProduct = async (id: number, data: any) => {
    const user = await prisma.products.update({
        where: { id },
        data
    })
    return (user);
}

export default { allProducts, productById, deleteProduct, createProduct, updateProduct };