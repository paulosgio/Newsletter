import { useEffect, type ReactNode } from "react";
import { useUserStore } from "../store/userStore";
import { Navigate } from "react-router-dom";

interface IAdminRouteProps {
    children: ReactNode
}

export function AdminRoute({children}: IAdminRouteProps) {

    const fetchUser = useUserStore((state)=> state.fetchUser)

    useEffect(()=> {
      fetchUser()
    }, [])

    const user = useUserStore((state)=> state.user)

    if (!user) {
        return <p>Carregando...</p>
    }

    if (user.role !== "ADMIN") {
        return <Navigate to="/home"/>
    }

    return children
}