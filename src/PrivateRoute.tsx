import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ContacaoContext } from "./pages/Cotacoes/CotacaoContext";



export function PrivateRoute ({children}:any){

    const {auth} = useContext(ContacaoContext);

    return auth ? children : <Navigate to="/login" />;

}