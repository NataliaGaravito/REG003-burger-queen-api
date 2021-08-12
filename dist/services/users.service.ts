import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const allUsers = async () => {
    try {
        // return await prisma.users.findMany()
        // const { id } = req.params
        const user = await prisma.users.findMany({
            where: { id: 1 },
        })
        console.log(user);
        return (user);
    } catch (e) {
        throw new Error(e.message)
    }
}

export default allUsers;