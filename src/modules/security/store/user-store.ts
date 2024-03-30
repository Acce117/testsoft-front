import { siteStore } from "@/common/site/siteStore";
import { defineStore } from "pinia";

export interface UserInterface {
    ci: '',
    username: '',
    role: [],
    userType: '',
    group: '',
    assignedTests:Array<{id:string, availabilityTime:Date}>
}

export const userStore = defineStore('user', {
    state: (): UserInterface => {
        let user = siteStore().loadUser();
        let state: UserInterface;
        user ?
            state = user :
            state = {
                ci: '',
                username: '',
                role: [],
                userType: '',
                group: '',
                assignedTests:[]
            }

        return state;
    },
});