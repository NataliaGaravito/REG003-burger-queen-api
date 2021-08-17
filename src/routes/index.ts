import { Router } from 'express';
import  getUsers from '../controller/users.controller'; 
import getProducts from '../controller/products.controller';
import getOrders from '../controller/orders.controller'

const router = Router();

router.use(function timeLog(req, res, next) {
    // console.log('Time: ', Date.now());
    next();
});

//  ---------   RUTAS MÓDULO USUARIOS  ------------   //
router.get('/users', getUsers.getAllUsers);
router.get('/users/:id', getUsers.getUserById);
router.post('/users', getUsers.createUser);
router.delete('/users/:id', getUsers.deleteUserById);
router.put('/users/:id', getUsers.updateUser); 

//  ---------   RUTAS MÓDULO PRODUCTOS  ------------   //
router.get('/products', getProducts.getAllProducts);
router.get('/products/:id', getProducts.getProductById);
router.post('/products', getProducts.createProduct);
router.delete('/products/:id', getProducts.deleteProductById);
router.put('/products/:id', getProducts.updateProduct); 

//  ---------   RUTAS MÓDULO ORDENES  ------------   //
router.get('/orders', getOrders.getAllOrders);
router.get('/orders/:id', getOrders.getOrderById);
router.post('/orders', getOrders.createOrder);
router.delete('/orders/:id', getOrders.deleteOrderById);
router.put('/orders/:id', getOrders.updateOrder); 

export default router;