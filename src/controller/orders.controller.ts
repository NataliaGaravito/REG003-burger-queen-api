import { Request, Response, urlencoded } from "express";
import ordersServices from '../services/orders.service';
import dotenv from 'dotenv';

dotenv.config();

const getAllOrders = async (req:Request, res:Response) => {
    try {
        const { page, limit } = req.query;
        const pageNumber = page? +page: 1;
        const limitNumber = limit? +limit : 10;
        const url = process.env.URL+'orders?page=';

        if (pageNumber <= 0 || limitNumber <=0) return res.status(400).json({errorMessage: "Invalid page/limit value"});

        const fetchedOrders = await ordersServices.allOrders(Number(pageNumber), Number(limitNumber));
        if (fetchedOrders.pagination.prev !== null) res.links({prev: url+fetchedOrders.pagination.prev}) 
        if (fetchedOrders.pagination.next !== null) res.links({next: url+fetchedOrders.pagination.next})

        return res.links({
            first: url+fetchedOrders.pagination.first,
            last: url+fetchedOrders.pagination.last,
        }).status(200).json({ orders: fetchedOrders.allOrders });
        
    } catch (err) {
        return res.status(500).json({ message: 'Orders not found!', error: err.message })
    }
}

const getOrderById = async (req:Request, res:Response) => {
    try {
        const { id } = req.params
        const fetchedOrder = await ordersServices.orderById(Number(id));
        return res.status(200).json({product: fetchedOrder});
    } catch (err) {
        return res.status(500).json({ message: 'Order not found!', error: err.message })
    }
}

const deleteOrderById = async (req:Request, res:Response) => {
    try {
        const { id } = req.params
        const deletedOrder = await ordersServices.deleteOrder(Number(id));
        return res.status(200).json({product: deletedOrder});
    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong, try again', error: err.message })
    }
}

const createOrder = async (req:Request, res:Response) => {
    try {
        const { userId, client, productsOrder } = req.body;
        const createdOrder = await ordersServices.createOrder(Number(userId), String(client), productsOrder);
        return res.status(200).json({product: createdOrder});
    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong, try again', error: err.message })
    }
}

const updateOrder = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const updatedOrder = await ordersServices.updateOrder(Number(id), req.body);
        return res.status(200).json({product: updatedOrder});
    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong, try again', error: err.message })
    }
}

export default { getAllOrders, getOrderById, deleteOrderById, createOrder, updateOrder }