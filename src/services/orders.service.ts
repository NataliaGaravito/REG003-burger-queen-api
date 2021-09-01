import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const getProductDetails = async (result:any) =>{
    let newArrayProducts: any = {...result};
    newArrayProducts = await Promise.all(newArrayProducts.products.map( async(elem:any) => {
        const product = await prisma.products.findUnique({
            where: {
                id: elem.productId,
            },
        })
        elem.product = {
            name: product.name,
            price: +product.price
        }
        return elem        
    }));
    return (result)
}

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
    const result = await prisma.orders.findMany({
        where: { id: Number(id) },
    })
    const finalResult = await getProductDetails(result[0]);
    // console.log(finalResult)
    return (finalResult);
}

const deleteOrder = async (id: number) => {
    const result = await prisma.orders.delete({
        where: { id: Number(id) },
    })
    return (result);
}

const createOrder = async (data: any) => {
    const { userId, client, products, status } = data;
    
    const result = await prisma.orders.create({
        data: {
            client,
            user: {
                connect: {
                    id: Number(userId)
                }
            },
            products,
            status: status? status: 'pending'
        },
    })
    return (getProductDetails(result));
}

const updateOrder = async (id: number, data: any) => {
    const order = await prisma.orders.update({
        where: { id },
        data
    })
    return (order);
}

export default { allOrders, orderById, deleteOrder, createOrder, updateOrder };