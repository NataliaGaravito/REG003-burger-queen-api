import { Request, response, Response } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const allUsers = async (page: number, limit: number) => {
    try {
        // const limitPage = limit ? limit : 10;
        const skip = (page-1) * limit;
        const offset = page * limit;
        const userCount = await prisma.users.count();
        // const last = Math.trunc( userCount / limit);
        const allUsers = await prisma.users.findMany({
            skip: skip,
            take: limit
        })
        let pagination = {
            next: offset < userCount ? page + 1: null,
            prev: skip > 0 ? page - 1 : null,
            first: 1,
            last : Math.trunc((userCount + limit - 1) / limit)
        }
        return { allUsers, pagination };
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

const createUser = async (email: string, roleId: number, admin: boolean) => {
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
const updateUser = async (id: number, data: any) => {
    try {
        const user = await prisma.users.update({
            where: { id },
            data
        })
        return (user);
    } catch (error) {
        throw new Error(error.message)
    }
}

export default { allUsers, userById, deleteUser, createUser, updateUser };