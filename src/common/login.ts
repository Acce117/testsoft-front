import { userStore, type UserInterface } from "@/modules/security/store/user-store";
import { sendRequest } from "./utils/fetch";

interface LoginForm {
    username: string,
    password: string
}
/**
 * 
 * @param credentials user credentials for authentication
 * @returns 
 */
export async function login(credentials: LoginForm) {
    if (credentials.username.trim() === '')
        throw new Error('The user name must be provided')
    if (credentials.password.trim() === '')
        throw new Error('The password must be provided ')

    const response = await sendRequest('http://localhost/testsoft/api/web/site/login', credentials, 'POST');

    if (response?.status === 401)
        throw new Error('Unauthorized');

    userStore().$patch(response.data as UserInterface);
    return true;
}