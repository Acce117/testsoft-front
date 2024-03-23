import { defineStore } from "pinia";
import { useSendRequest } from "../utils/fetch";
import { reactive, watch } from "vue";
import { userStore, type UserInterface } from "@/modules/security/store/user-store";
import useEvents from "../utils/useEvents";
import { i18n } from "@/plugins/i18n";
import router from "@/router";

const { t } = i18n.global;

export const siteStore = defineStore('site', {
    actions: {
        useLogin() {
            const request = useSendRequest();

            function login(credentials: any) {
                if (credentials.username.trim() === '')
                    throw new Error('The user name must be provided')
                if (credentials.password.trim() === '')
                    throw new Error('The password must be provided ')

                request.sendRequest(
                    `${import.meta.env.VITE_API_PATH}/site/login`,
                    credentials,
                    'POST',
                    () => {
                        if (!request.error.value) {
                            userStore().$patch(request.result.value as unknown as UserInterface);
                            sessionStorage.setItem("uer", JSON.stringify(request.result.value));
                            useEvents().dispatch('redirect', '/');
                        } else {
                            useEvents().dispatch('error', {
                                severity: "error",
                                summary: "Error",
                                detail: t('login.error'),
                                life: 3000,
                            });
                        }
                    }
                )
            }

            return reactive({ loading: request.loading, login });
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