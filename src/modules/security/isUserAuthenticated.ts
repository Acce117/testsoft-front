import { userStore } from "./store/user-store";


export function isUserAuthenticated(){
    //TODO Implement JWT security 
    //TODO Review user auth standard
    return userStore().ci != ''
}