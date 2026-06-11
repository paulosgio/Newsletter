import { AuthRepository } from "./auth.repository.js";
import type { LoginDTO, RegisterDTO } from "./auth.schema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class AuthService {

    private repository: AuthRepository

    constructor(repository: AuthRepository) {
        this.repository = repository
    }

    async login({ email, password }: LoginDTO) {

        const account = await this.repository.findByEmail(email)

        if (!account) {
            throw new Error("Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, account.password)
        
        if (!passwordMatch) {
            throw new Error("Invalid credentials");
        }

        const accessToken = jwt.sign(
            {
                email: account.email,
                role: account.role,
                id: account.id
            },
            process.env.SECRET_ACCESS_TOKEN!,
            {
                expiresIn: "15m"
            }
        )

        const refreshToken = jwt.sign(
            {
                email: account.email,
                role: account.role
            },
            process.env.SECRET_REFRESH_TOKEN!,
            {
                expiresIn: "7d"
            }
        )

        return {
            accessToken,
            refreshToken
        }
    }

    async register({ email, password, role }: RegisterDTO) {

        const userExist = await this.repository.findByEmail(email)

        if (userExist) {
            throw new Error("Account alredy exist");
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await this.repository.create(email, hashedPassword, role)

        return {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role
        }
    }
}

// tratamento de erros aqui, com erros personalizados