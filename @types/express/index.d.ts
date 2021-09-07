declare namespace Express {
  export interface Request {
    userAdmin?: boolean,
    userId?: number,
    auth?: Record<string, unknown>,
    email?: string
  }
}