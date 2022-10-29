import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

export const PersistLogin = ()=>{
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth2 } = useAuth();


    useEffect(()=>{
        const verifyRefreshToken = async ()=>{
            try {
                
                await refresh();
                
            }catch(err){
                console.error(err);
            }
            finally {
                setIsLoading(false)
            }
        }

        !auth2?.acessToken ? verifyRefreshToken(): setIsLoading(false)
    },[])

    return (
        <>
        {isLoading
            ? <p>Carregando...</p>
            : <Outlet/>
        }
        
        </>
    )

}