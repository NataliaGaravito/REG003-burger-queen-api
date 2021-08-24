import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const newUser = await prisma.users.create({
    data: {
        email: 'magolita@mail.com',
        password: 'mypassword',
        admin: true
    }
  })
  console.log('Created new user: ', newUser)

  const allUsers = await prisma.users.findMany()
  console.log('All users: ')
  console.dir(allUsers, { depth: null })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())