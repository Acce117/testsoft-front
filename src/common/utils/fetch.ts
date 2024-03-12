import axios, { type AxiosRequestConfig } from "axios";
import { ref } from "vue";

export function sendRequest(
    url: string,
    data?: Object,
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH' = 'GET'
) {
    let result = ref();
    let loading = ref<boolean>(true);
    let error = ref (false);

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
            loading.value = false;
            result.value = res.data;
        })
        .catch(err => {
            error.value = true;
            loading.value = false;
        })

    return {
        result, loading, error
    };

}