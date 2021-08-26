import { Request, Response, NextFunction } from "express";
import error from '../middleware/error';
import authService from '../services/auth.service';

const generateToken = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const token = await authService.generateToken(String(email), String(password));
        return res.status(200).header('token', token).json({ email: email });        
    } catch (err) {
        return error(500, req, res, next);
    }
}

export default { generateToken }