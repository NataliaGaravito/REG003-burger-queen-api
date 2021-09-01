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

const userById = async (parameter: any) => {
    const isNan = isNaN(Number(parameter));
    const user = await isNan ? (prisma.users.findMany({
        where:{ email: String(parameter) }
    })
    ): (prisma.users.findMany({
        where:{ id: Number(parameter) }
    }))
    return (user);
}

const deleteUser = async (parameter: any) => {
    const isNan = isNaN(Number(parameter));
    const user = await isNan ? (prisma.users.delete({
        where:{ email: String(parameter) }
    })
    ): (prisma.users.delete({
        where:{ id: Number(parameter) }
    }))
    return (user);
}

const createUser = async (email: string, password: string, roles: object) => {
    const result = await prisma.users.create({
        data: {
            email,
            password: await bcrypt.hash(password, 10),
            roles
        },
    })
    return (result);
}

const updateUser = async (parameter: any, data: any) => {
    const isNan = isNaN(Number(parameter));
    data.password = await bcrypt.hash(data.password, 10);
    const user = await isNan ? (prisma.users.update({
        where:{ email: String(parameter) }, data
    })
    ): (prisma.users.update({
        where:{ id: Number(parameter) }, data
    }))
    return (user);
}

export default { allUsers, userById, deleteUser, createUser, updateUser };