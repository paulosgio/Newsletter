import { useForm } from "react-hook-form"
import { api } from "../../services/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface ILogin {
    email: string,
    password: string
}

export default function Login() {

    const { register, handleSubmit } = useForm<ILogin>()
    const [err, setErr] = useState<string | undefined>()
    const navigate = useNavigate()

    const onSubmit = async (data: ILogin) => {
        try {
            console.log("Oi");
            
            const response = await api.post("/auth/login", data)
            const { accessToken, refreshToken } = response.data
            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("refreshToken", refreshToken)
            navigate("/home")
        } catch (error) {
            setErr("Email or password incorrect!")
            throw error
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">email</label>
            <input type="text" id="email" { ...register("email", { required: true }) }/>
            <label htmlFor="password">password</label>
            <input type="text" id="password" { ...register("password", { required: true }) }/>
            <p>{ err }</p>
            <button type="submit">Enviar</button>
        </form>
    )
}