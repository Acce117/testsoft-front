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
export function login(credentials: LoginForm) {
    if (credentials.username.trim() === '')
        throw new Error('The user name must be provided')
    if (credentials.password.trim() === '')
        throw new Error('The password must be provided ')

    return sendRequest(`${import.meta.env.VITE_API_PATH}/site/login`, credentials, 'POST');

}