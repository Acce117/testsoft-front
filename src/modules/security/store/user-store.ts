import { siteStore } from "@/common/site/siteStore";
import { defineStore } from "pinia";

export interface UserInterface {
    user_id:'',
    ci: '',
    name:'',
    username: '',
    role: [],
    userType: '',
    group: '',
    groupName:'',
    assignedTests:Array<{id:string, availabilityTime:Date}>
}

export const userStore = defineStore('user', {
    state:  (): UserInterface => {
        const user =  siteStore().getUserInLocal();
        let state: UserInterface;
        console.log(user)
        user ?
            state = user :
            state = {
                user_id:'',
                ci: '',
                name:'',
                username: '',
                role: [],
                userType: '',
                group: '',
                groupName:'',
                assignedTests:[]
            }

        return state;
    },
});