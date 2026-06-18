import type { ReactNode } from "react"
import { useNavigate } from "react-router-dom"

interface ILayoutProps {
    children: ReactNode
}

export default function Layout({children}: ILayoutProps) {
    const navigate = useNavigate()
    return(
        <>
            <header>
                <ul>
                    <li onClick={()=> {
                        localStorage.removeItem("accessToken")
                        localStorage.removeItem("refreshToken")
                        navigate("/")
                    }}>logout</li>
                </ul>
            </header>
        <main>
            {children}
        </main>
        </>
    )
}