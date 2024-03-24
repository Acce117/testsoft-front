import axios, { type AxiosRequestConfig } from "axios";
import { ref } from "vue";

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
            method: method,
            url,
        }
        if (data)
            method === 'GET' ?
                config.params = data :
                config.data = JSON.stringify(data);

        axios(config)
            .then(res => {
                result.value = res.data 
                error.value = false
            })
            .catch(err => error.value = true )
            .finally(() => {
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