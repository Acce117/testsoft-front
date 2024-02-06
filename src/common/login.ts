import { sendRequest } from "./utils/fetch";

/**
 * 
 * @param credentials user credentials for authentication
 * @returns 
 */
async function login({ username, password }: { username: string, password: string }) {
    if (username.trim() === '')
        throw new Error('The user name must be provided')
    if (password.trim() === '')
        throw new Error('The password must be provided ')

    const response = await sendRequest('http://localhost/testsoft/api/web/site/login', { username, password }, 'POST');

    if (response?.status === 401)
        throw new Error('Unauthorized');

    

    return true;
}