import { Request, Response } from "express";
import userServices from '../services/users.service';

const getAllUsers = async (req:Request, res:Response) => {
    try {
        const fetchedUsers = await userServices.allUsers();
        console.log("fetch " + fetchedUsers);
        return res.status(200).json({users: fetchedUsers});
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const getUserById = async (req:Request, res:Response) => {
    try {
        const { id } = req.params
        const fetchedUser = await userServices.userById(Number(id));
        console.log("fetch " + fetchedUser);
        return res.status(200).json({users: fetchedUser});
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
export default { getAllUsers, getUserById }