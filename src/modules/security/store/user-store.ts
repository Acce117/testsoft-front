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
        let user = sessionStorage.getItem('user');
        let state: UserInterface;
        user ?
            state = JSON.parse(user) :
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