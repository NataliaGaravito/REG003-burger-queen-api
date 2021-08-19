import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const allOrders = async (page:number, limit:number) => {
    try {
        // const limitPage = limit ? limit : 10;
        const skip = (page-1) * limit;
        const offset = page * limit;
        const ordersCount = await prisma.orders.count();
        // const last = Math.trunc( ordersCount / limit);
        const allOrders = await prisma.orders.findMany({
            skip: skip,
            take: limit
        })
        let pagination = {
            next: offset < ordersCount ? page + 1: null,
            prev: skip > 0 ? page - 1 : null,
            first: 1,
            last : Math.trunc((ordersCount + limit - 1) / limit)
        }
        return { allOrders, pagination };
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