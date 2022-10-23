import axios from '../lib/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    
    const { setAuth2 } = useAuth();


    const refresh = async () => {

        const response = await axios.get('/refresh/', {
            withCredentials: true
        })
        setAuth2((prev: any) => {
            return { ...prev, accessToken: response.data.accessToken}
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;