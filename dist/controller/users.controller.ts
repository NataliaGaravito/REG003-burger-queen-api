import { Request, Response } from "express";
import userServices from '../services/users.service';

const getAllUsers = async (req:Request, res:Response) => {
    try {
        const fetchedUsers = await userServices.allUsers();
        return res.status(200).json({users: fetchedUsers});
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getUserById = async (req:Request, res:Response) => {
    try {
        const { id } = req.params
        const fetchedUser = await userServices.userById(Number(id));
        return res.status(200).json({users: fetchedUser});
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const deleteUserById = async (req:Request, res:Response) => {
    try {
        const { id } = req.params
        const deletedUser = await userServices.deleteUser(Number(id));
        console.log("fetch " + deletedUser);
        return res.status(200).json({users: deletedUser});
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const createUser = async (req:Request, res:Response) => {
    try {
        const { email, roleId, admin } = req.body;
        const createdUser = await userServices.createUser(String(email), Number(roleId), Boolean(admin));
        console.log("fetch " + createdUser);
        return res.status(200).json({users: createdUser});
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const updateUser = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const { email, roleId, admin } = req.body;        
        const updatedUser = await userServices.updateUser(Number(id), String(email), Number(roleId), Boolean(admin));
        console.log("fetch " + updatedUser);
        return res.status(200).json({users: updatedUser});
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export default { getAllUsers, getUserById, deleteUserById, createUser, updateUser }