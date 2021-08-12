import { Router } from 'express';
import  getUsers from '../controller/users.controller'; 

const router = Router();

router.use(function timeLog(req, res, next) {
    // console.log('Time: ', Date.now());
    next();
});
router.get('/users', getUsers.getAllUsers);
router.get('/user/:id', getUsers.getUserById);

export default router;