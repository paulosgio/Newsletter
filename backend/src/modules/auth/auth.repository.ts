import type { PrismaClient } from "@prisma/client";

export class AuthRepository {

    private db: PrismaClient

    constructor(db: PrismaClient){
        this.db = db
    }

    async findByEmail(email: string) {
        return await this.db.user.findUnique({
            where: {
                email   
            }
        })
    }

    async create(email: string, password: string) {
        return await this.db.user.create({
            data: {
                email,
                password,
            }
        })
    }
}