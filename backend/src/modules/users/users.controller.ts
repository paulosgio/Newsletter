import { prisma } from "../../database/prisma.js";
import { UsersRepository } from "./users.repository.js";
import { UserService } from "./users.service.js";
import type { Request, Response } from "express"

const repository = new UsersRepository(prisma)
const service = new UserService(repository)

export class UsersController {

    async subscribe(req: Request, res: Response) {
        
        const data = await service.subscribeService(req.user.id)
        return res.status(200).json(data)
    }

    async unsubscribe(req: Request, res: Response) {
        
        const data = await service.unsubscribeService(req.user.id)
        return res.status(200).json(data)
    }

    async findSubscribers(req: Request, res: Response) {
        
        const data = await service.findSubscribersService()
        return res.status(200).json(data)
    }

    async me(req: Request, res: Response) {
        
        const data = await service.meService(req.user.id)
        return res.status(200).json(data)
    }
}