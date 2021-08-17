"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../controller/users.controller"));
const products_controller_1 = __importDefault(require("../controller/products.controller"));
const orders_controller_1 = __importDefault(require("../controller/orders.controller"));
const router = express_1.Router();
router.use(function timeLog(req, res, next) {
    // console.log('Time: ', Date.now());
    next();
});
//  ---------   RUTAS MÓDULO USUARIOS  ------------   //
router.get('/users', users_controller_1.default.getAllUsers);
router.get('/users/:id', users_controller_1.default.getUserById);
router.post('/users', users_controller_1.default.createUser);
router.delete('/users/:id', users_controller_1.default.deleteUserById);
router.put('/users/:id', users_controller_1.default.updateUser);
//  ---------   RUTAS MÓDULO PRODUCTOS  ------------   //
router.get('/products', products_controller_1.default.getAllProducts);
router.get('/products/:id', products_controller_1.default.getProductById);
router.post('/products', products_controller_1.default.createProduct);
router.delete('/products/:id', products_controller_1.default.deleteProductById);
router.put('/products/:id', products_controller_1.default.updateProduct);
//  ---------   RUTAS MÓDULO ORDENES  ------------   //
router.get('/orders', orders_controller_1.default.getAllOrders);
router.get('/orders/:id', orders_controller_1.default.getOrderById);
router.post('/orders', orders_controller_1.default.createOrder);
router.delete('/orders/:id', orders_controller_1.default.deleteOrderById);
router.put('/orders/:id', orders_controller_1.default.updateOrder);
exports.default = router;
//# sourceMappingURL=index.js.map