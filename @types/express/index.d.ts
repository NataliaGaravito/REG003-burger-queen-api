declare namespace Express {
    export interface Request {
      userAdmin?: Boolean,
      userId?: Number,
      auth?: Object
    }
}