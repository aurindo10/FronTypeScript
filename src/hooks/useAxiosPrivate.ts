import { axiosPrivate } from '../lib/axios';
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import axios from '../lib/axios'

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth2 } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(

            config => {

                if (!config.headers!['Authorization']) {
                    config.headers!['Authorization'] = `Bearer ${auth2?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken =  await refresh();
                    if (newAccessToken) {
                        prevRequest.headers = {
                          ...prevRequest.headers,
                          Authorization: `Bearer ${newAccessToken}`,
                        };
                      }
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