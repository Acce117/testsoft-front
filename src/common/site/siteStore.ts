import { defineStore } from "pinia";
import { sendRequest } from "../utils/fetch";
import { watch } from "vue";
import { userStore, type UserInterface } from "@/modules/security/store/user-store";
import useEvents from "../utils/useEvents";
import { i18n } from "@/plugins/i18n";

const { t } = i18n.global;

export const siteStore = defineStore('site', {
    actions: {
        login(credentials: any) {
            let loading = true;

            if (credentials.username.trim() === '')
                throw new Error('The user name must be provided')
            if (credentials.password.trim() === '')
                throw new Error('The password must be provided ')

            const response = sendRequest(`${import.meta.env.VITE_API_PATH}/site/login`, credentials, 'POST');

            watch(response.loading, () => {
                if (!response.error.value) {
                    userStore().$patch(response.result.value as unknown as UserInterface);
                    sessionStorage.setItem("user", JSON.stringify(response.result.value));
                    useEvents().dispatch('redirect', '/');
                } else {
                    loading = false;
                    useEvents().dispatch('error', {
                        severity: "error",
                        summary: "Error",
                        detail: t('login.error'),
                        life: 3000,
                    });
                }
            });
        },

        logout() {
            useEvents().dispatch('confirm', {
                message: t('profile.dialogs.close-session.message'),
                header: t('profile.dialogs.close-session.header'),
                rejectLabel: t('global.cancel'),
                acceptLabel: t('global.confirm'),
                accept: () => {
                    userStore().$reset();
                    sessionStorage.removeItem('user');
                    useEvents().dispatch('redirect', "/login");
                },
            })
        }
    }
});