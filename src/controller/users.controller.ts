import { Request, Response, NextFunction } from "express";
import userServices from '../services/users.service';
import error from '../middleware/error';
import { EACCES } from "constants";
// import dotenv from 'dotenv';
// dotenv.config();
type CreateUserResponse = {
    id: number
    _id?: string;
    email: string;
    password: string;
    roles: any;
}

const getAllUsers = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { page, limit } = req.query;
        const pageNumber = page? +page: 1;
        const limitNumber = limit? +limit : 10;
        const urlPage = '/users?page=';
        const urlLimit = '&limit='
        // const url = process.env.URL+'users?page=';

        if (pageNumber <= 0 || limitNumber <=0) return error(400, req, res, next);

        const fetchedUsers = await userServices.allUsers(Number(pageNumber), Number(limitNumber));
        const newFetchedUsers = fetchedUsers.allUsers.map((elem:any) =>{
            elem._id = elem.id
            delete elem.id
            delete elem.password 
            return elem
        })
        if (fetchedUsers.pagination.prev !== null) res.links({prev: urlPage+fetchedUsers.pagination.prev+urlLimit+limitNumber}) 
        if (fetchedUsers.pagination.next !== null) res.links({next: urlPage+fetchedUsers.pagination.next+urlLimit+limitNumber})
        return res.links({
            first: urlPage+fetchedUsers.pagination.first+urlLimit+limitNumber,
            last: urlPage+fetchedUsers.pagination.last+urlLimit+limitNumber,
        }).status(200).json(newFetchedUsers);
        
    } catch (err) {
        return error(500, req, res, next);
    }
}

const getUserById = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const fetchedUser = await userServices.userById(id);
        if(fetchedUser.length === 0) return error({statusCode: 404}, req, res, next);  
        const responseUser:CreateUserResponse = { ...fetchedUser[0] }
        responseUser._id = fetchedUser[0].id.toString()
        delete responseUser.id
        delete responseUser.password              
        return res.status(200).json(responseUser);
    } catch (err) {
        return error(500, req, res, next);
    }
}

const deleteUserById = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const deletedUser = await userServices.deleteUser(id);
        const responseUser:CreateUserResponse = { ...deletedUser }
        responseUser._id = deletedUser.id.toString()
        delete responseUser.id
        delete responseUser.password
        return res.status(200).json(responseUser);
    } catch (err) {
        if(err.code === 'P2025') return error({statusCode: 404, message: err.meta.cause}, req, res, next);
        return error(500, req, res, next);
    }
}

const createUser = async (req:Request, res:Response, next: NextFunction) => {
    const { email, password, roles } = req.body;
    const emailRegExp = (/\S+@\S+\.\S+/).test(email);
    if ((email == undefined) || (password == undefined) || (!emailRegExp) || (password.length <= 3)) return error(400, req, res, next);
    try {        
        const createdUser = await userServices.createUser(String(email), String(password), Object(roles));
        const responseUser:CreateUserResponse = { ...createdUser }
        responseUser._id = createdUser.id.toString()
        delete responseUser.id
        delete responseUser.password
        return res.status(200).json(responseUser);
    } catch (err) {
        if(err.code === 'P2002') return error({statusCode: 403, message: "Email already registered"}, req, res, next);
        return error(500, req, res, next);
    }
}

const updateUser = async (req:Request, res:Response, next: NextFunction) => {
    const { password, roles } = req.body; 
    const { id } = req.params; 
    if ((id === undefined) || (password === undefined)) return error(400, req, res, next);
    if ((roles) && (!req.userAdmin)) return error(403, req, res, next);
    try {
        const updatedUser = await userServices.updateUser(id, req.body);
        const responseUser:CreateUserResponse = { ...updatedUser }
        responseUser._id = updatedUser.id.toString()
        delete responseUser.id
        delete responseUser.password
        return res.status(200).json(responseUser);
    } catch (err) {
        if(err.code === 'P2025'){
            return error({statusCode: 404, message: err.meta.cause}, req, res, next);
        }
        return error(500, req, res, next);
    }
}

export default { getAllUsers, getUserById, deleteUserById, createUser, updateUser }

