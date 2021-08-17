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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const allOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield prisma.orders.findMany();
        return allProducts;
    }
    catch (e) {
        throw new Error(e.message);
    }
});
const orderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma.orders.findMany({
            where: { id: Number(id) },
        });
        return (product);
    }
    catch (e) {
        throw new Error(e.message);
    }
});
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma.orders.delete({
            where: { id: Number(id) },
        });
        return (product);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const createOrder = (userId, client, productsOrder) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.orders.create({
            data: {
                client,
                user: {
                    connect: {
                        id: Number(userId)
                    }
                },
                productsOrder
            },
        });
        return (result);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const updateOrder = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield prisma.orders.update({
            where: { id },
            data
        });
        return (order);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.default = { allOrders, orderById, deleteOrder, createOrder, updateOrder };
//# sourceMappingURL=orders.service.js.map