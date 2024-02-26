import axios, { type AxiosRequestConfig } from "axios";

export async function sendRequest<T>(
    url: string,
    data?: Object,
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH' = 'GET'
) {

    const config: AxiosRequestConfig = {
        method: method,
        url,
    }
    if (data)
        method === 'GET' ?
            config.params = data :
            config.data = JSON.stringify(data);

    return (await axios<T>(config));

}