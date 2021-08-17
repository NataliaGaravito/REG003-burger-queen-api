import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');
module.exports = (secret: String) => (req: Request, resp: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return next();
    }
    const [type, token] = authorization.split(' ');
    if (type.toLowerCase() !== 'bearer') {
        return next();
    }
    jwt.verify(token, secret, (err: any, decodedToken: String) => {
        if (err) {
            return next(403);
        }
        // TODO: Verificar identidad del usuario usando `decodeToken.uid`
    });
};
module.exports.isAuthenticated = (req: Request) => (
// TODO: decidir por la informacion del request si la usuaria esta autenticada
false);
module.exports.isAdmin = (req: Request) => (
// TODO: decidir por la informacion del request si la usuaria es admin
false);
module.exports.requireAuth = (req: Request, resp: Response, next: NextFunction) => ((!module.exports.isAuthenticated(req))
    ? next(401)
    : next());
module.exports.requireAdmin = (req: Request, resp: Response, next: NextFunction) => (
// eslint-disable-next-line no-nested-ternary
(!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
        ? next(403)
        : next());
