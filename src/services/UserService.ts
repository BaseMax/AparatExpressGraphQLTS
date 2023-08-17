import { Prisma, PrismaClient, User } from "@prisma/client";

export class UserService {
    private readonly prisma : PrismaClient

    constructor(){
        this.prisma = new PrismaClient()
    }
    async findOne(where : Prisma.UserWhereInput):Promise<User>{
        return await this.prisma.user.findFirst({where})
    }
}