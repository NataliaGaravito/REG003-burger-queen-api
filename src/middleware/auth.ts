import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default (secret: string) => (req: Request, resp: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return next();
    }
    const [type, token] = authorization.split(' ');
    if (type.toLowerCase() !== 'bearer') {
        return next();
    }

    jwt.verify(token, secret, async (err: any, decodedToken: any) => {
        if (err) {
            req.auth = false;
            return next(resp.json({ statusCode: 403, message: 'Need authentication' }))
        }
        const user = await prisma.users.findUnique({ where: { id: decodedToken.userId } });
        req.userId = user.id;
        req.userAdmin = user.admin;
        req.auth = user;
        return next();
    });
};

export const isAuthenticated = (req: Request) => (req.auth ? true : false);

export const isAdmin = (req: Request) => (req.userAdmin ? true : false);

export const isItSelf = (req: Request) => {
    const { id } = req.params;
    const userId: number = +id;
    return (req.userId === userId ? true : false)
}

export const requireAuth = (req: Request, resp: Response, next: NextFunction) => ((!isAuthenticated(req)) ? next({ statusCode: 401, message: 'Need authentication' }) : next());

export const requireAdmin = (req: Request, resp: Response, next: NextFunction) => {
    if (!isAuthenticated(req)) return next(resp.json({ statusCode: 401, message: 'Need authentication' }))
    else if (!isAdmin(req)) return next(resp.json({ statusCode: 403, message: 'Need admin' }))
    else return next()
};

export const requireItSelf = (req: Request, resp: Response, next: NextFunction) => {
    if (!isAuthenticated(req)) return next(resp.json({ statusCode: 401, message: 'Need authentication' }))
    else if ((isAdmin(req)) ||(isItSelf(req))) return next()
    else return next(resp.json({ statusCode: 403, message: 'Need admin' }))
};

