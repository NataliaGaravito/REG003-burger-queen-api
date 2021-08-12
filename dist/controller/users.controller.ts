import {Request, Response} from "express";
import allUsers from '../services/users.service';

const getUsers = async (req:Request, res:Response) => {
    try {
        const users = await allUsers();
        console.log(users);
        return res.status(200).json({users});
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export default getUsers