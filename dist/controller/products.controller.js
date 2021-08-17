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
const products_service_1 = __importDefault(require("../services/products.service"));
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedProducts = yield products_service_1.default.allProducts();
        return res.status(200).json({ product: fetchedProducts });
    }
    catch (err) {
        return res.status(500).json({ message: 'Products not found!', error: err.message });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const fetchedProduct = yield products_service_1.default.productById(Number(id));
        return res.status(200).json({ product: fetchedProduct });
    }
    catch (err) {
        return res.status(500).json({ message: 'Product not found!', error: err.message });
    }
});
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedProduct = yield products_service_1.default.deleteProduct(Number(id));
        return res.status(200).json({ product: deletedProduct });
    }
    catch (err) {
        return res.status(500).json({ message: 'Something went wrong, try again', error: err.message });
    }
});
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, image, type } = req.body;
        const createdProduct = yield products_service_1.default.createProduct(String(name), Number(price), String(image), Number(type));
        return res.status(200).json({ product: createdProduct });
    }
    catch (err) {
        return res.status(500).json({ message: 'Something went wrong, try again', error: err.message });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedProduct = yield products_service_1.default.updateProduct(Number(id), req.body);
        return res.status(200).json({ product: updatedProduct });
    }
    catch (err) {
        return res.status(500).json({ message: 'Something went wrong, try again', error: err.message });
    }
});
exports.default = { getAllProducts, getProductById, deleteProductById, createProduct, updateProduct };
//# sourceMappingURL=products.controller.js.map