import { Request, Response, urlencoded } from "express";
import authService from '../services/auth.service';

const generateToken = async (req:Request, res:Response) => {
    try {
        const { email, password } = req.body;
        const token = await authService.generateToken(String(email), String(password));
        return res.status(200).header('token', token).json({ email: email });        
    } catch (err) {
        return res.status(500).json({ message: 'Bad request, try again', error: err.message })
    }
}

export default { generateToken }