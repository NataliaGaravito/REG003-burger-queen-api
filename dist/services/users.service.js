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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const allUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // return await prisma.users.findMany()
        // const { id } = req.params
        const allUsers = yield prisma.users.findMany();
        // console.log(allUsers);
        return allUsers;
    }
    catch (e) {
        throw new Error(e.message);
    }
});
const userById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.users.findMany({
            where: { id: Number(id) },
        });
        return (user);
    }
    catch (e) {
        throw new Error(e.message);
    }
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.users.delete({
            where: { id: Number(id) },
        });
        return (user);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const createUser = (email, roleId, admin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.users.create({
            data: {
                email,
                admin,
                role: {
                    connect: {
                        id: Number(roleId)
                    }
                }
            },
        });
        return (result);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.users.update({
            where: { id },
            data
        });
        return (user);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.default = { allUsers, userById, deleteUser, createUser, updateUser };
//# sourceMappingURL=users.service.js.map