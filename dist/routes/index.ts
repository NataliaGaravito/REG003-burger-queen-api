import { Router } from 'express';
import getUsers from '../controller/users.controller'; 

const router = Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.get('/users', getUsers);

export default router;