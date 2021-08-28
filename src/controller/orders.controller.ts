import { Request, Response, NextFunction  } from "express";
import error from '../middleware/error';
import ordersServices from '../services/orders.service';

const getAllOrders = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { page, limit } = req.query;
        const pageNumber = page? +page: 1;
        const limitNumber = limit? +limit : 10;
        // const url = process.env.URL+'orders?page=';
        const url = '/orders?page=';

        if (pageNumber <= 0 || limitNumber <=0) return error(400, req, res, next);

        const fetchedOrders = await ordersServices.allOrders(Number(pageNumber), Number(limitNumber));
        if (fetchedOrders.pagination.prev !== null) res.links({prev: url+fetchedOrders.pagination.prev}) 
        if (fetchedOrders.pagination.next !== null) res.links({next: url+fetchedOrders.pagination.next})

        return res.links({
            first: url+fetchedOrders.pagination.first,
            last: url+fetchedOrders.pagination.last,
        }).status(200).json({ orders: fetchedOrders.allOrders });
        
    } catch (err) {
        return error({statusCode: 500, message: err.meta.cause}, req, res, next);
    }
}

const getOrderById = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const fetchedOrder = await ordersServices.orderById(Number(id));
        if(fetchedOrder.length === 0) return error({statusCode: 404}, req, res, next);
        return res.status(200).json({order: fetchedOrder});
    } catch (err) {
        return error({statusCode: 500, message: err.meta.cause}, req, res, next);
    }
}

const deleteOrderById = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const deletedOrder = await ordersServices.deleteOrder(Number(id));
        return res.status(200).json({order: deletedOrder});
    } catch (err) {
        return error({statusCode: 404, message: err.meta.cause}, req, res, next);
    }
}

const createOrder = async (req:Request, res:Response, next: NextFunction) => {
    if((Object.keys(req.body).length === 0) || (req.body.products.length <=0)) return error({statusCode: 400, message: "No product(s) provided"}, req, res, next);
    try {
        const { userId, client, products } = req.body;
        const createdOrder = await ordersServices.createOrder(Number(userId), String(client), products);
        return res.status(200).json({order: createdOrder});
    } catch (err) {
        console.log(err)
        return error({statusCode: 400}, req, res, next);
    }
}

const updateOrder = async (req:Request, res:Response, next: NextFunction) => {
    if(Object.keys(req.body).length === 0) return error({statusCode: 400}, req, res, next);
    else{
        try {
            const { id } = req.params;
            const updatedOrder = await ordersServices.updateOrder(Number(id), req.body);
            return res.status(200).json({order: updatedOrder});
        } catch (err) {
            if(err.code === 'P2025') return error({statusCode: 404, message: err.meta.cause}, req, res, next);
            return error({statusCode: 400}, req, res, next);            
        }
    }
    
}

export default { getAllOrders, getOrderById, deleteOrderById, createOrder, updateOrder }