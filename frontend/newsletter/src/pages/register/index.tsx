import { useForm } from "react-hook-form"
import { api } from "../../services/api"
import { useState } from "react"

interface IRegister {
    email: string,
    password: string,
    role: "USER" | "ADMIN"
}

export default function Register() {

    const { register, handleSubmit } = useForm<IRegister>()
    const [errMsg, setErrMsg] = useState<string | null>()

    const onSubmit = async (data: IRegister)=> {
        const formatedData = {
            ...data,
            role: data.role[0]
        }
        try {
            await api.post("/auth/register", formatedData)
        } catch (error) {
            setErrMsg("Error to register account: " + error)
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">email</label>
            <input id="email" type="text" {...register("email", {required: true})} />
            <label htmlFor="">password</label>
            <input id="password" type="text" {...register("password", {required: true})} />
            <label htmlFor="">role</label>
            <input id="user" type="checkbox" {...register("role", {required: true})} value="USER"/>
            <input id="admin" type="checkbox" {...register("role", {required: true})} value="ADMIN"/>
            <p>{errMsg}</p>
            <button type="submit">Submit</button>
        </form>
    )
}