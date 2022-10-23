import { useContext, useDebugValue } from "react";
import { ContacaoContext } from "../pages/Cotacoes/CotacaoContext"

const useAuth = () => {
    const { auth2 } = useContext(ContacaoContext);
    useDebugValue(auth2, auth2 => auth2?.email ? "Logged In" : "Logged Out")
    return useContext(ContacaoContext);
}
export default useAuth;
