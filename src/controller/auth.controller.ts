import { Request, Response, NextFunction } from 'express';
import error from '../middleware/error';
import authService from '../services/auth.service';

const generateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body;
    const emailRegExp = /\S+@\S+\.\S+/.test(email);
    if (!email || !password || !emailRegExp || password.length <= 3)
      return error(400, req, res, next);
    const token = await authService.generateToken(
      String(email),
      String(password)
    );
    if (token === 'User Not Found' || token === 'Invalid Password')
      return error({ statusCode: 404, message: token }, req, res, next);
    return res.status(200).json({ token: token });
  } catch (err) {
    return error(500, req, res, next);
  }
};

export default { generateToken };
