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
const allProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield prisma.products.findMany();
        return allProducts;
    }
    catch (e) {
        throw new Error(e.message);
    }
});
const productById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma.products.findMany({
            where: { id: Number(id) },
        });
        return (product);
    }
    catch (e) {
        throw new Error(e.message);
    }
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma.products.delete({
            where: { id: Number(id) },
        });
        return (product);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const createProduct = (name, price, image, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.products.create({
            data: {
                name,
                price,
                image,
                type: {
                    connect: {
                        id: Number(type)
                    }
                },
            },
        });
        return (result);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const updateProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.products.update({
            where: { id },
            data
        });
        return (user);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.default = { allProducts, productById, deleteProduct, createProduct, updateProduct };
//# sourceMappingURL=products.service.js.map