import axios from "../lib/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth2 } = useAuth();

    const logout = async () => {
        setAuth2({});
        try {
            console.log('chegou aqui')
            const response = await axios('/refresh/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout