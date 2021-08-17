"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_service_1 = __importDefault(require("../services/orders.service"));
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedOrders = yield orders_service_1.default.allOrders();
        return res.status(200).json({ product: fetchedOrders });
    }
    catch (err) {
        return res.status(500).json({ message: 'Products not found!', error: err.message });
    }
});
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const fetchedOrder = yield orders_service_1.default.orderById(Number(id));
        return res.status(200).json({ product: fetchedOrder });
    }
    catch (err) {
        return res.status(500).json({ message: 'Product not found!', error: err.message });
    }
});
const deleteOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedOrder = yield orders_service_1.default.deleteOrder(Number(id));
        return res.status(200).json({ product: deletedOrder });
    }
    catch (err) {
        return res.status(500).json({ message: 'Something went wrong, try again', error: err.message });
    }
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, client, productsOrder } = req.body;
        const createdOrder = yield orders_service_1.default.createOrder(Number(userId), String(client), productsOrder);
        return res.status(200).json({ product: createdOrder });
    }
    catch (err) {
        return res.status(500).json({ message: 'Something went wrong, try again', error: err.message });
    }
});
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedOrder = yield orders_service_1.default.updateOrder(Number(id), req.body);
        return res.status(200).json({ product: updatedOrder });
    }
    catch (err) {
        return res.status(500).json({ message: 'Something went wrong, try again', error: err.message });
    }
});
exports.default = { getAllOrders, getOrderById, deleteOrderById, createOrder, updateOrder };
//# sourceMappingURL=orders.controller.js.map