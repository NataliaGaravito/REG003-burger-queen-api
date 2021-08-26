import { Request, response, Response } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import bcrypt from 'bcryptjs';

const allUsers = async (page: number, limit: number) => {
    const skip = (page-1) * limit;
    const offset = page * limit;
    const userCount = await prisma.users.count();
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
}

const userById = async (id: number) => {
    const user = await prisma.users.findMany({
        where: { id: Number(id) },
    })
    return (user);
}

const deleteUser = async (id: number) => {
    const user = await prisma.users.delete({
        where: { id: Number(id) },
    })
    return (user);
}

const createUser = async (email: string, password: string, admin: boolean) => {
    const result = await prisma.users.create({
        data: {
            email,
            password: await bcrypt.hash(password, 10),
            admin
        },
    })
    return (result);
}

const updateUser = async (id: number, data: any) => {
    const user = await prisma.users.update({
        where: { id },
        data
    })
    return (user);
}

export default { allUsers, userById, deleteUser, createUser, updateUser };