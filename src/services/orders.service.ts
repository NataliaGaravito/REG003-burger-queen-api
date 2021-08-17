import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const allOrders = async () => {
    try {
        const allProducts = await prisma.orders.findMany()
        return allProducts;
    } catch (e) {
        throw new Error(e.message)
    }
}

const orderById = async (id: number) => {
    try {
        const product = await prisma.orders.findMany({
            where: { id: Number(id) },
        })
        return (product);
    } catch (e) {
        throw new Error(e.message)
    }
}

const deleteOrder = async (id: number) => {
    try {
        const product = await prisma.orders.delete({
            where: { id: Number(id) },
        })
        return (product);
    } catch (error) {
        throw new Error(error.message)
    }
}

const createOrder = async (userId: number , client: string, productsOrder:object ) => {
    try {
        const result = await prisma.orders.create({
            data: {
                client,
                user: {
                    connect: {
                        id: Number(userId)
                    }
                },
                productsOrder
            },
        })
        return (result);
    } catch (error) {
        throw new Error(error.message)
    }
}
const updateOrder = async (id: number, data: any) => {
    try {
        const order = await prisma.orders.update({
            where: { id },
            data
        })
        return (order);
    } catch (error) {
        throw new Error(error.message)
    }
}

export default { allOrders, orderById, deleteOrder, createOrder, updateOrder };