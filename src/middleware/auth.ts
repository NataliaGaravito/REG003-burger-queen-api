import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import error from '../middleware/error';
const prisma = new PrismaClient();

type User = {
    id: number
    email: string
    password: string
    roles: any
}

export default (secret: string) => (req: Request, resp: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return next(error(401, req, resp, next));
    }
    const [type, token] = authorization.split(' ');
    if (type.toLowerCase() !== 'bearer') {
        return next();
    }

    jwt.verify(token, secret, async (err: any, decodedToken: any) => {
        if (err) {
            req.auth = false;
            return next(error(403, req, resp, next))
        }
        const user:User = await prisma.users.findUnique({ where: { id: decodedToken.userId } });
        if(!user) error(400, req, resp, next)
        req.userId = user.id;
        req.userAdmin = user.roles.admin;
        req.auth = user;
        req.email = user.email;
        return next();
    });
};

export const isAuthenticated = (req: Request) => (req.auth ? true : false);

export const isAdmin = (req: Request) => (req.userAdmin ? true : false);

export const isItSelf = (req: Request) => {
    const { id } = req.params;
    const isNan = isNaN(Number(id));
    let itSelf ; 
    if (isNan) {
        itSelf = req.email === id ? true : false
    } else {
        const userId: number = +id;
        itSelf = req.userId === userId ? true : false
    }        
    return (itSelf)  
}

export const requireAuth = (req: Request, resp: Response, next: NextFunction) => ((!isAuthenticated(req)) ? next(error(401, req, resp, next)) : next());

export const requireAdmin = (req: Request, resp: Response, next: NextFunction) => {
    if (!isAuthenticated(req)) return next(error(401, req, resp, next))
    else if (isAdmin(req)) return next()
    else return next(error(403 ,req, resp, next))
};

export const requireItSelf = (req: Request, resp: Response, next: NextFunction) => {
    if (!isAuthenticated(req)) return next(error(401, req, resp, next))
    else if ((isAdmin(req)) ||(isItSelf(req))) return next()
    else return next(error(403, req, resp, next))
};

