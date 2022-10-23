import { Navigate, Outlet, useLocation } from "react-router-dom"
import useAuth from "./hooks/useAuth"

export const RequireAuth = ()=>{
    const { auth2 } = useAuth()
    const location = useLocation()

    
    return (
        auth2?.email
        ?<Outlet/>
        :<Navigate to="/login" state={{from: location}} replace/>
    )
}