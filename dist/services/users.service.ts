import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const allUsers = async () => {
    try {
        // return await prisma.users.findMany()
        // const { id } = req.params
        const allUsers = await prisma.users.findMany()
       // console.log(allUsers);
        return allUsers;
    } catch (e) {
        throw new Error(e.message)
    }
}

const userById = async (id:number) => {
    try {
        // return await prisma.users.findMany()
        // const { id } = req.params
        const user = await prisma.users.findMany({
            where: { id: Number(id) },
        })
        // console.log(user);
        return(user);
    } catch (e) {
        throw new Error(e.message)
    }
}

console.log(userById);

export default { allUsers, userById };