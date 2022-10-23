import { axiosPrivate } from '../lib/axios';
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth2 } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(

            config => {
                console.log(!config.headers!['Authorization'])
                if (!config.headers!['Authorization']) {

                    config.headers!['Authorization'] = `Bearer ${auth2?.accessToken}`;
                    console.log(config.headers!['Authorization'])
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                console.log(error?.response?.status)
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken =  await refresh();
                    error.config.headers!['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth2, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;