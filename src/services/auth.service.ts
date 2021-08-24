import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import bcrypt from 'bcryptjs';


const generateToken = async (email:string, password:string) => {
    const user = await prisma.users.findUnique({ where: { email } });
    const userId = user.id;
    if (!user) throw new Error('No User Found');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Wrong Password');

    const token: string = await jwt.sign({userId}, process.env.SECRET_TOKEN);
    return token;
}

export default { generateToken };