import type { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma.js";

const db = prisma

export async function adminOnly(req: Request, res: Response, next: NextFunction) {
    
    const user = await db.user.findUnique({
        where: {
            id: req.user.id
        }
    })

    if (!user || user.role !== "ADMIN") {
        return res.status(403).json({
            message: "Access denied"
        })
    }

    next()
}