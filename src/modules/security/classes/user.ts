import { sendRequest } from "@/common/utils/fetch";
import { reactive } from "vue";
import { type UserInterface } from "../interfaces/user";

class User implements UserInterface{
    username: string;
    password: string;
    
    login(){
        if(this.username.trim() === '')
            throw new Error('The user name must be provided')
        if(this.password.trim() === '')
            throw new Error('The password must be provided ')
        
        sendRequest('http://localhost/testsoft/api/web/site/login', this as UserInterface, 'POST');

        console.log(this);
    }
}

const user: User = new User();

export function useUser(){
    return  reactive(user);;
}