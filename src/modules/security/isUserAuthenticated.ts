import { userStore } from "./store/user-store";


export function isUserAuthenticated(){
    const user = userStore();
    //TODO Implement JWT security 
    //TODO Review user auth standard
    return user.ci!==''
}