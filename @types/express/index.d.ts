declare namespace Express {
    export interface Request {
      userAdmin?: Boolean,
      userId?: number,
      auth?: Object
    }
}