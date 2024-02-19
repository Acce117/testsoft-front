import { defineStore } from "pinia";

export interface UserInterface {
    ci: '',
    username: '',
    role: [],
    userType: '',
    group: ''
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
                group: ''
            }

        return state;
    },
});