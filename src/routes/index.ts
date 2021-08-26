import { Router } from 'express';
import getUsers from '../controller/users.controller'; 
import getProducts from '../controller/products.controller';
import getOrders from '../controller/orders.controller';
import getAuth from '../controller/auth.controller';
import validate from '../middleware/auth';
import { requireAdmin, requireAuth, requireItSelf } from '../middleware/auth';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

router.use(function timeLog(req, res, next) {
    // console.log('Time: ', Date.now());
    next();
});

//  ---------   RUTAS MÓDULO AUTH  ------------   //
router.post('/auth', getAuth.generateToken);
router.use(validate(process.env.SECRET_TOKEN));

//  ---------   RUTAS MÓDULO USUARIOS  ------------   //
router.get('/users', requireAdmin, getUsers.getAllUsers); 
router.get('/users/:id', requireItSelf, getUsers.getUserById); // Requiere token de autenticación y que la usuaria sea admin o la usuaria a modificar
router.post('/users', requireAdmin, getUsers.createUser);
router.delete('/users/:id', requireItSelf, getUsers.deleteUserById); // Requiere token de autenticación y que la usuaria sea admin o la usuaria a modificar
router.put('/users/:id', requireItSelf, getUsers.updateUser); // Requiere token de autenticación y que la usuaria sea admin o la usuaria a modificar

//  ---------   RUTAS MÓDULO PRODUCTOS  ------------   //
router.get('/products', requireAuth , getProducts.getAllProducts);
router.get('/products/:id', requireAuth, getProducts.getProductById);
router.post('/products', requireAdmin, getProducts.createProduct);
router.delete('/products/:id', requireAdmin, getProducts.deleteProductById);
router.put('/products/:id', requireAdmin, getProducts.updateProduct); 

//  ---------   RUTAS MÓDULO ORDENES  ------------   //
router.get('/orders', requireAuth, getOrders.getAllOrders);
router.get('/orders/:id', requireAuth, getOrders.getOrderById);
router.post('/orders', requireAuth, getOrders.createOrder);
router.delete('/orders/:id', requireAuth, getOrders.deleteOrderById);
router.put('/orders/:id', requireAuth, getOrders.updateOrder); 

export default router;