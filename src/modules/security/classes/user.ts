import { sendRequest } from "@/common/utils/fetch";
import { reactive, ref } from "vue";
import { type LoginForm } from "../types/loginForm";
import type { UserInterface } from "../types/user-interface";

/**
 * User class to instance an user Object for use
 */
export class User implements UserInterface {
    ci: number;
    username: string;
    role: string;
    userType: string;
    group: number;

    /**
     * 
     * @param credentials user credentials for authentication
     * @returns 
     */
    static async login(credentials: LoginForm) {
        if (credentials.username.trim() === '')
            throw new Error('The user name must be provided')
        if (credentials.password.trim() === '')
            throw new Error('The password must be provided ')

        const response = await sendRequest<User>('http://localhost/testsoft/api/web/site/login', credentials, 'POST');

        if (response?.status === 401)
            throw new Error('Unauthorized');

        user = reactive<UserInterface>(response.data);

        return true;
    }
}

/**
 * user instance
 */
export let user: UserInterface;