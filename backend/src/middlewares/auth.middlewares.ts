import type { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken"

export function auth(req: Request, res: Response, next: NextFunction) {
    const auth_header = req.headers.authorization
    
    if (!auth_header) {
        return res.status(401).json({
            message: "Token not submitted"
        })
    }

    const token = auth_header.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            message: "Token not submmited"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN!)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        })
    }
}