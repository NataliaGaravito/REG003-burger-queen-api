import { Request, Response, NextFunction } from 'express';
import error from '../middleware/error';
import ordersServices from '../services/orders.service';

const statusAcceptable = [
  'pending',
  'preparing',
  'canceled',
  'delivering',
  'delivered'
];

type CreateOrderResponse = {
  id: number | string;
  _id?: string;
  userId: number;
  client: string;
  products: any;
  status: string;
  dateEntry: Date;
  dateProcessed: Date;
};

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit } = req.query;
    const pageNumber = page ? +page : 1;
    const limitNumber = limit ? +limit : 10;
    // const url = process.env.URL+'orders?page=';
    const url = '/orders?page=';

    if (pageNumber <= 0 || limitNumber <= 0) return error(400, req, res, next);

    const fetchedOrders = await ordersServices.allOrders(
      Number(pageNumber),
      Number(limitNumber)
    );
    if (
      fetchedOrders.pagination.prev !== null &&
      fetchedOrders.pagination.next !== null
    ) {
      return res
        .links({
          next: url + fetchedOrders.pagination.next,
          prev: url + fetchedOrders.pagination.prev,
          first: url + fetchedOrders.pagination.first,
          last: url + fetchedOrders.pagination.last
        })
        .status(200)
        .json(fetchedOrders.allOrders);
    } else if (fetchedOrders.pagination.prev !== null) {
      return res
        .links({
          prev: url + fetchedOrders.pagination.prev,
          first: url + fetchedOrders.pagination.first,
          last: url + fetchedOrders.pagination.last
        })
        .status(200)
        .json(fetchedOrders.allOrders);
    } else if (fetchedOrders.pagination.next !== null) {
      return res
        .links({
          next: url + fetchedOrders.pagination.next,
          first: url + fetchedOrders.pagination.first,
          last: url + fetchedOrders.pagination.last
        })
        .status(200)
        .json(fetchedOrders.allOrders);
    } else {
      return res
        .links({
          first: url + fetchedOrders.pagination.first,
          last: url + fetchedOrders.pagination.last
        })
        .status(200)
        .json(fetchedOrders.allOrders);
    }
  } catch (err) {
    return error({ statusCode: 500, message: err.meta.cause }, req, res, next);
  }
};

const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const idNumber = +id;
  const isNan = isNaN(Number(id));
  if (isNan) return error({ statusCode: 404 }, req, res, next);
  try {
    const fetchedOrder = await ordersServices.orderById(Number(idNumber));
    if (fetchedOrder.length === 0)
      return error({ statusCode: 404 }, req, res, next);
    const responseOrder: CreateOrderResponse = { ...fetchedOrder };
    responseOrder._id = fetchedOrder.id.toString();
    delete responseOrder.id;
    return res.status(200).json(responseOrder);
  } catch (err) {
    if (err.code === 'P2025')
      return error(
        { statusCode: 404, message: err.meta.cause },
        req,
        res,
        next
      );
    return error({ statusCode: 500, message: err.meta.cause }, req, res, next);
  }
};

const deleteOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const idNumber = +id;
  const isNan = isNaN(Number(id));
  if (isNan) return error({ statusCode: 404 }, req, res, next);
  try {
    const deletedOrder = await ordersServices.deleteOrder(Number(idNumber));
    const responseOrder: CreateOrderResponse = { ...deletedOrder };
    responseOrder._id = deletedOrder.id.toString();
    delete responseOrder.id;
    return res.status(200).json(responseOrder);
  } catch (err) {
    return error({ statusCode: 404, message: err.meta.cause }, req, res, next);
  }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { status } = req.body;
  if (Object.keys(req.body).length === 0 || req.body.products.length <= 0)
    return error(
      { statusCode: 400, message: 'No product(s) provided' },
      req,
      res,
      next
    );
  if (status && !statusAcceptable.includes(status))
    return error(
      { statusCode: 400, message: 'Bad status provided' },
      req,
      res,
      next
    );

  try {
    const createdOrder = await ordersServices.createOrder(req.body);
    const responseOrder: CreateOrderResponse = { ...createdOrder };
    responseOrder._id = createdOrder.id.toString();
    delete responseOrder.id;
    return res.status(200).json(responseOrder);
  } catch (err) {
    return error({ statusCode: 400 }, req, res, next);
  }
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = +id;
  const { status } = req.body;
  const isNan = isNaN(Number(id));

  if (Object.keys(req.body).length === 0)
    return error({ statusCode: 400 }, req, res, next);
  if (isNan) return error({ statusCode: 404 }, req, res, next);
  if (status && !statusAcceptable.includes(status))
    return error(
      { statusCode: 400, message: 'Bad status provided' },
      req,
      res,
      next
    );

  try {
    const updatedOrder = await ordersServices.updateOrder(
      Number(idNumber),
      req.body
    );
    const responseOrder: CreateOrderResponse = { ...updatedOrder };
    responseOrder._id = updatedOrder.id.toString();
    delete responseOrder.id;
    return res.status(200).json(responseOrder);
  } catch (err) {
    if (err.code === 'P2025')
      return error(
        { statusCode: 404, message: err.meta.cause },
        req,
        res,
        next
      );
    return error({ statusCode: 400 }, req, res, next);
  }
};

export default {
  getAllOrders,
  getOrderById,
  deleteOrderById,
  createOrder,
  updateOrder
};
