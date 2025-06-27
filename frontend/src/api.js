import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const api =  axios.create({
    baseURL: import.meta.env.VITE_API_URL // Usando a variável do .env para especificar o URL base da aplicação (api)
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        
        if(token) {
            // Passando o JWT Token para autenticação

            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    }, 
    (error) => {
        return Promise.reject(error);
    }
)

export default api;