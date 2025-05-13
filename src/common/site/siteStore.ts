import { defineStore } from "pinia";
import { useSendRequest } from "../utils/fetch";
import { reactive } from "vue";
import { userStore } from "@/modules/security/store/user-store";
import useEvents from "../utils/useEvents";
import { i18n } from "@/plugins/i18n";
import TokenHandler from "../utils/token-handler";
import { sendRequest } from "@/common/utils/sendRequest";
import { createI18n } from "vue-i18n";
import { useLocalI18n } from "../utils/useLocalI18n";

const localMessages = {
  es: {
    "close-session": {
      header: "Salir",
      message: "¿Desea cerrar sesión?",
    },
    login: {
      error: "Credenciales incorrectas",
      something_wrong:"Algo ha salido mal"
    },
  },
  en: {
    "close-session": {
      header: "Logout",
      message: "Do you want to log out?",
    },
    login: {
      error: "Invalid credentials",
      something_wrong:"Something went wrong"
    },
  },
};

export const siteStore = defineStore("site", {
  actions: {
    getUserInLocal() {
      let user;
      try {
        const userStorage = localStorage.getItem("user");
        if (userStorage) user = JSON.parse(userStorage);
        else throw new Error("Not Authenticated");
      } catch (err) {
        console.log(err);
      }

      return user;
    },

    async loadUser() {
      const token: string | null = TokenHandler.getToken();
      let user;
      try {
        if (token) {
          user = await sendRequest({
            url: `${import.meta.env.VITE_API_PATH}/me`,
          });
          localStorage.setItem("user", JSON.stringify(user));
        } else throw new Error("Not Authenticated");
      } catch (err) {
        console.log(err);
      }

      return user;
    },

    useLogin() {
      const t = useLocalI18n(localMessages);
      const request = useSendRequest();

      const loginRequestHandler = (async () => {
        if (!request.error.value) {
          useEvents().dispatch("login", {temporalToken:request.result.value.token, groups:request.result.value.groups});
        } else {
          useEvents().dispatch("error", {
            severity: "error",
            summary: "Error",
            detail: t("login.error"),
            life: 3000,
          });
        }
      }).bind(this);

      const selectGroupRequestHandler = (async () => {
        if (!request.error.value) {
          //TokenHandler.storeRefreshToken(request.result.value.refreshToken);
          TokenHandler.storeToken(request.result.value.token);
          //TO DO change token storing
          const user = await this.loadUser();
          userStore().$patch(user);

          useEvents().dispatch("redirect", '/');
        } else {
          useEvents().dispatch("error", {
            severity: "error",
            summary: "Error",
            detail: t("login.something_wrong"),
            life: 3000,
          });
        }
      }).bind(this);

      function login(credentials: any) {
        

       request.sendRequest(
          `${import.meta.env.VITE_API_PATH}/login`,
          credentials,
          "POST",
          loginRequestHandler
        );
      }
      function selectGroup(group: number, temporalToken:string) {
        

       request.sendRequest(
          `${import.meta.env.VITE_API_PATH}/select_group/${group}`,
          {},
          "GET",
          selectGroupRequestHandler,
          temporalToken
        );
      }

      return reactive({ loading: request.loading, login , selectGroup});
    },

    logout() {
      const t = useLocalI18n(localMessages);

      useEvents().dispatch("confirm", {
        message: t("close-session.message"),
        header: t("close-session.header"),

        accept: () => {
          userStore().$reset();
          localStorage.removeItem("user");
          TokenHandler.removeRefreshToken();
          TokenHandler.removeToken();
          useEvents().dispatch("redirect", "/login");
        },
      });
    },
  },
});
