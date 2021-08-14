import { Router } from 'express';
import  getUsers from '../controller/users.controller'; 
import getProducts from '../controller/products.controller';

const router = Router();

router.use(function timeLog(req, res, next) {
    // console.log('Time: ', Date.now());
    next();
});

//  ---------   RUTAS MÓDULO USUARIOS  ------------   //
router.get('/users', getUsers.getAllUsers);
router.get('/user/:id', getUsers.getUserById);
router.post('/user', getUsers.createUser);
router.delete('/user/:id', getUsers.deleteUserById);
router.put('/user/:id', getUsers.updateUser); // Para arreglar: Verificar cómo actualizar con parámetros opcionales

//  ---------   RUTAS MÓDULO PRODUCTOS  ------------   //
router.get('/products', getProducts.getAllProducts);
router.get('/product/:id', getProducts.getProductById);
router.post('/product', getProducts.createProduct);
router.delete('/product/:id', getProducts.deleteProductById);
router.put('/product/:id', getProducts.updateProduct); // Para arreglar: Verificar cómo actualizar con parámetros opcionales

export default router;