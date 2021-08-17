"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchedUsers = yield users_service_1.default.allUsers();
        return res.status(200).json({ users: fetchedUsers });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const fetchedUser = yield users_service_1.default.userById(Number(id));
        return res.status(200).json({ users: fetchedUser });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield users_service_1.default.deleteUser(Number(id));
        return res.status(200).json({ users: deletedUser });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, roleId, admin } = req.body;
        const createdUser = yield users_service_1.default.createUser(String(email), Number(roleId), Boolean(admin));
        return res.status(200).json({ users: createdUser });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedUser = yield users_service_1.default.updateUser(Number(id), req.body);
        return res.status(200).json({ users: updatedUser });
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.default = { getAllUsers, getUserById, deleteUserById, createUser, updateUser };
//# sourceMappingURL=users.controller.js.map