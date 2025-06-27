import {Navigate} from "react-router-dom"
import{jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"

function ProtectedRoute({children}) {
    // Verificando se o usuário está logado para acessar rotas protegidas
    // Será importante para usuários sem permissão não acessar telas/funções

    const [isAuthorized, setAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const rereshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post("/api/token/refresh", {
                refresh: refreshToken
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch(error){
            console.log(error)
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setAuthorized(false);
            return
        }

        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setAuthorized(true)
        }
    }

    if (isAuthorized === null) {
        return <div> Loading ... </div>
    }

    const goTo = (route) => {
        if (route === "/Home") {
            console.log("Not authorized");
            return <Navigate to="/Home" />
        } else {
        return children 
    }
}

    return isAuthorized ? goTo(children) : goTo("/Home") //<Navigate to="/Home" />
}

export default ProtectedRoute