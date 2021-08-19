import { Request, Response } from "express";
import userServices from '../services/users.service';

const getAllUsers = async (req:Request, res:Response) => {
    try {
        const { page, limit } = req.query;
        const pageNumber = page? +page: 1;
        const limitNumber = limit? +limit : 10;
        const url = 'localhost:3000/api/users?page=';

        if (pageNumber <= 0 || limitNumber <=0) return res.status(400).json({errorMessage: "Invalid page/limit value"});

        const fetchedUsers = await userServices.allUsers(Number(pageNumber), Number(limitNumber));
        if (fetchedUsers.pagination.prev !== null) res.links({prev: url+fetchedUsers.pagination.prev}) 
        if (fetchedUsers.pagination.next !== null) res.links({next: url+fetchedUsers.pagination.next})

        return res.links({
            first: url+fetchedUsers.pagination.first,
            last: url+fetchedUsers.pagination.last,
        }).status(200).json({ users: fetchedUsers.allUsers });
        
    } catch (err) {
        return res.status(500).json({ message: 'Users not found!', error: err.message })
    }
}

const getUserById = async (req:Request, res:Response) => {
    try {
        const { id } = req.params
        const fetchedUser = await userServices.userById(Number(id));
        return res.status(200).json({users: fetchedUser});
    } catch (err) {
        return res.status(500).json({ message: 'User not found!', error: err.message })
    }
}

const deleteUserById = async (req:Request, res:Response) => {
    try {
        const { id } = req.params
        const deletedUser = await userServices.deleteUser(Number(id));
        return res.status(200).json({users: deletedUser});
    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong, try again', error: err.message })
    }
}

const createUser = async (req:Request, res:Response) => {
    try {
        const { email, roleId, admin } = req.body;
        const createdUser = await userServices.createUser(String(email), Number(roleId), Boolean(admin));
        return res.status(200).json({users: createdUser});
    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong, try again', error: err.message })
    }
}

const updateUser = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;       
        const updatedUser = await userServices.updateUser(Number(id), req.body);
        return res.status(200).json({users: updatedUser});
    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong, try again', error: err.message })
    }
}

export default { getAllUsers, getUserById, deleteUserById, createUser, updateUser }

