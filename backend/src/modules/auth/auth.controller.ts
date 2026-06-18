import type { Request, Response } from "express"
import { loginSchema, registerSchema } from "./auth.schema.js"
import { AuthService } from "./auth.service.js"
import { AuthRepository } from "./auth.repository.js"
import { prisma } from "../../database/prisma.js"

const repository = new AuthRepository(prisma)
const service = new AuthService(repository)

export class AuthController {
    async login(req: Request, res: Response) {

        const data = loginSchema.parse(req.body)
        const result = await service.login(data)

        return res.status(200).json(result)
    }

    async register(req: Request, res: Response) {

        const data = registerSchema.parse(req.body)
        const result = await service.register(data)

        return res.status(201).json(result)
    }

    async refresh(req: Request, res: Response) {

        const refreshToken = req.body.refreshToken
        const result = await service.refreshService(refreshToken)

        return res.status(201).json(result)
    }
}