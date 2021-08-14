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

const userById = async (id: number) => {
    try {
        const user = await prisma.users.findMany({
            where: { id: Number(id) },
        })
        return (user);
    } catch (e) {
        throw new Error(e.message)
    }
}

const deleteUser = async (id: number) => {
    try {
        const user = await prisma.users.delete({
            where: { id: Number(id) },
        })
        return (user);
    } catch (error) {
        throw new Error(error.message)
    }
}

const createUser =  async (email: string, roleId: number, admin: boolean) => {
    try {
        const result = await prisma.users.create({
            data: {
                email,
                admin,
                role: {
                    connect: {
                        id: Number(roleId)
                    }
                }
            },
        })
        return (result);
    } catch (error) {
        throw new Error(error.message)
    }
}
const updateUser = async (id:number, email:string, roleId: number, admin: boolean) => {
    try {    
        const user = await prisma.users.update({
            where: { id: id },
            data: {
                email,
                admin,
                role: {
                    connect: {
                        id: Number(roleId)
                    }
                }
            },
        })
        return(user);
    } catch (error) {
        throw new Error(error.message)
    }
} 

export default { allUsers, userById, deleteUser, createUser, updateUser};