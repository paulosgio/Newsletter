import type { PrismaClient } from "@prisma/client";

export class UsersRepository {

    private db: PrismaClient

    constructor(db: PrismaClient) {
        this.db = db
    }

    async subscribe(id: string) {
        return await this.db.user.update({
            where: {
                id
            },
            data: {
                subscribed: true
            },
            select: {
                id: true,
                email: true,
                role: true,
                subscribed: true,
                createdAt: true,
                campaigns: true
            }
        })
    }

    async unsubscribe(id: string) {
        return await this.db.user.update({
            where: {
                id
            },
            data: {
                subscribed: false
            },
            select: {
                id: true,
                email: true,
                role: true,
                subscribed: true,
                createdAt: true,
                campaigns: true
            }
        })
    }

    async findSubscribers() {
        return await this.db.user.findMany({
            where: {
                subscribed: true
            }
        })
    }

    async me(id: string) {
        return await this.db.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                email: true,
                role: true,
                subscribed: true,
                createdAt: true,
                campaigns: true
            }
        })
    }
}