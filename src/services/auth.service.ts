import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import bcrypt from 'bcryptjs';


const generateToken = async (email:string, password:string) => {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) return ('User Not Found');
    const userId = user.id;
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return ('Invalid Password');
    const token: string = await jwt.sign({userId}, process.env.SECRET_TOKEN);
    return token;
}

export default { generateToken };