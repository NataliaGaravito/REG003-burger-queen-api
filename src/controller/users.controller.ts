import { Request, Response, NextFunction } from "express";
import userServices from '../services/users.service';
import error from '../middleware/error';
import dotenv from 'dotenv';
dotenv.config();

const getAllUsers = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { page, limit } = req.query;
        const pageNumber = page? +page: 1;
        const limitNumber = limit? +limit : 10;
        const url = process.env.URL+'users?page=';

        if (pageNumber <= 0 || limitNumber <=0) return error(400, req, res, next);

        const fetchedUsers = await userServices.allUsers(Number(pageNumber), Number(limitNumber));
        if (fetchedUsers.pagination.prev !== null) res.links({prev: url+fetchedUsers.pagination.prev}) 
        if (fetchedUsers.pagination.next !== null) res.links({next: url+fetchedUsers.pagination.next})

        return res.links({
            first: url+fetchedUsers.pagination.first,
            last: url+fetchedUsers.pagination.last,
        }).status(200).json({ users: fetchedUsers.allUsers });
        
    } catch (err) {
        return error(500, req, res, next);
    }
}

const getUserById = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const fetchedUser = await userServices.userById(Number(id));
        if(fetchedUser.length === 0) return error({statusCode: 404}, req, res, next);        
        return res.status(200).json({users: fetchedUser});
    } catch (err) {
        return error(500, req, res, next);
    }
}

const deleteUserById = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const deletedUser = await userServices.deleteUser(Number(id));
        return res.status(200).json({users: deletedUser});
    } catch (err) {
        if(err.code === 'P2025') return error({statusCode: 404, message: err.meta.cause}, req, res, next);
        return error(500, req, res, next);
    }
}

const createUser = async (req:Request, res:Response, next: NextFunction) => {
    const { email, password, admin } = req.body;
    if ((email == undefined) || (password == undefined)) return error(400, req, res, next);
    try {        
        const createdUser = await userServices.createUser(String(email), String(password), Boolean(admin));
        return res.status(200).json({users: createdUser});
    } catch (err) {
        if(err.code === 'P2002') return error({statusCode: 403, message: "Email already registered"}, req, res, next);
        return error(500, req, res, next);
    }
}

const updateUser = async (req:Request, res:Response, next: NextFunction) => {
    const { email, password, admin, roleId } = req.body; 
    if ((email == undefined) || (password == undefined)) return error(400, req, res, next);
    if (((roleId) || (admin) ) && (!req.userAdmin)) return error(403, req, res, next);
    try {
        const { id } = req.params;    
        const updatedUser = await userServices.updateUser(Number(id), req.body);
        return res.status(200).json({users: updatedUser});
    } catch (err) {
        if(err.code === 'P2025'){
            return error({statusCode: 404, message: err.meta.cause}, req, res, next);
        }
        return error(500, req, res, next);
    }
}

export default { getAllUsers, getUserById, deleteUserById, createUser, updateUser }

