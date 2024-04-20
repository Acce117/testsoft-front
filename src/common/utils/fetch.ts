import axios, { AxiosError, AxiosHeaders, type AxiosRequestConfig } from "axios";
import { ref } from "vue";
import TokenHandler from "./token-handler";

async function refreshToken(){
    
    const config: AxiosRequestConfig = {
        headers: new AxiosHeaders(),
        url: `${import.meta.env.VITE_API_PATH}/seguridad/jwt/refresh`,
        method: 'POST',
    }
    
    if(config.headers) config.headers.Authorization = `Bearer ${TokenHandler.getRefreshToken()}`;

    const res = await axios(config);
    
    TokenHandler.storeToken(res.data);
}

export function useSendRequest(
    immediate = false,
    url?: string,
    data?: Object,
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH' = 'GET',
    cb = () => {}
) {
    let result = ref();
    let loading = ref<boolean>(false);
    let error = ref(false);

    function sendRequest(
        url: string,
        data?: Object,
        method: 'GET' | 'POST' | 'DELETE' | 'PATCH' = 'GET',
        cb = () => {}
    ) {

        const config: AxiosRequestConfig = {
            headers: new AxiosHeaders(),
            method,
            url,
        }
        
        const token = TokenHandler.getToken();
        if(token){
            if(config.headers) config.headers.Authorization = `Bearer ${token}`;
        }

        if (data)
            method === 'GET' ?
                config.params = data :
                config.data = data;
                //config.data = JSON.stringify(data);

        let err: AxiosError;
        axios(config)
            .then(res => {
                result.value = res.data 
                error.value = false
            })
            .catch(e => { 
                error.value = true 
                err = e;
            })
            .finally(async () => {
                /*if(error.value && TokenHandler.getRefreshToken())
                    await refreshToken();
                */
                loading.value = false;
                cb();
            });

        loading.value = true;
        
    }

    if(immediate)
        sendRequest(url as string, data, method, cb);
    
    return {
        result, loading, error, sendRequest
    };
}