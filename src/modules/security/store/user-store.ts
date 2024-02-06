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
        return {
            ci: '',
            username: '',
            role: [],
            userType: '',
            group: ''
        }
    },
});