import { Request, Response } from "express";
import ordersServices from '../services/orders.service';


const getAllOrders = async (req:Request, res:Response) => {
    try {
        const fetchedOrders = await ordersServices.allOrders();
        return res.status(200).json({product: fetchedOrders});
    } catch (err) {
        return res.status(500).json({ message: 'Products not found!', error: err.message })
    }
}

const getOrderById = async (req:Request, res:Response) => {
    try {
        const { id } = req.params
        const fetchedOrder = await ordersServices.orderById(Number(id));
        return res.status(200).json({product: fetchedOrder});
    } catch (err) {
        return res.status(500).json({ message: 'Product not found!', error: err.message })
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