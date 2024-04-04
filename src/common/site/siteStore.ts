import { defineStore } from "pinia";
import { useSendRequest } from "../utils/fetch";
import { reactive, watch } from "vue";
import { userStore, type UserInterface } from "@/modules/security/store/user-store";
import useEvents from "../utils/useEvents";
import { i18n } from "@/plugins/i18n";
import router from "@/router";
import TokenHandler from "../utils/token-handler";

const { t } = i18n.global;

export const siteStore = defineStore('site', {
    actions: {
        loadUser() {
            const token: string | null = TokenHandler.getToken();
            let user;
            try {
                if (token) {
                    const a = token.split('.');
                    user = JSON.parse(atob(token.split('.')[1])).user;
                }
            } catch (err) {
                console.log(err);
            }

            return user;
        },

        useLogin() {
            const request = useSendRequest();

            const loginRequestHandler = (() => {
                if (!request.error.value) {
                    TokenHandler.storeRefreshToken(request.result.value.refreshToken);
                    TokenHandler.storeToken(request.result.value.token);

                    const user = this.loadUser();        
                    userStore().$patch(user);
                    useEvents().dispatch('redirect', '/');
                } else {
                    useEvents().dispatch('error', {
                        severity: "error",
                        summary: "Error",
                        detail: t('login.error'),
                        life: 3000,
                    });
                }
            }).bind(this);

            function login(credentials: any) {
                if (credentials.username.trim() === '')
                    throw new Error('The user name must be provided')
                if (credentials.password.trim() === '')
                    throw new Error('The password must be provided ')

                request.sendRequest(
                    `${import.meta.env.VITE_API_PATH}/site/login`,
                    credentials,
                    'POST',
                    loginRequestHandler
                );
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
                    TokenHandler.removeRefreshToken();
                    TokenHandler.removeToken();
                    useEvents().dispatch('redirect', "/login");
                },
            })
        }
    }
});