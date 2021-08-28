import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const allOrders = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const offset = page * limit;
    const ordersCount = await prisma.orders.count();
    const allOrders = await prisma.orders.findMany({
        skip: skip,
        take: limit
    })
    let pagination = {
        next: offset < ordersCount ? page + 1 : null,
        prev: skip > 0 ? page - 1 : null,
        first: 1,
        last: Math.trunc((ordersCount + limit - 1) / limit)
    }
    return { allOrders, pagination };
}

const orderById = async (id: number) => {
    const product = await prisma.orders.findMany({
        where: { id: Number(id) },
    })
    return (product);
}

const deleteOrder = async (id: number) => {
    const product = await prisma.orders.delete({
        where: { id: Number(id) },
    })
    return (product);
}

const createOrder = async (userId: number, client: string, products: object) => {
    const result = await prisma.orders.create({
        data: {
            client,
            user: {
                connect: {
                    id: Number(userId)
                }
            },
            productsOrder: products
        },
    })
    return (result);
}

const updateOrder = async (id: number, data: any) => {
    const order = await prisma.orders.update({
        where: { id },
        data
    })
    return (order);
}

export default { allOrders, orderById, deleteOrder, createOrder, updateOrder };