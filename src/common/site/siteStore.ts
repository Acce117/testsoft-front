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
      error: "Inicio de sesión inválido",
    },
  },
  en: {
    "close-session": {
      header: "Logout",
      message: "Do you want to log out?",
    },
    login: {
      error: "Invalid login",
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
          TokenHandler.storeRefreshToken(request.result.value.refreshToken);
          TokenHandler.storeToken(request.result.value.token);

          const user = await this.loadUser();
          userStore().$patch(user);

          useEvents().dispatch("redirect", "/");
        } else {
          useEvents().dispatch("error", {
            severity: "error",
            summary: "Error",
            detail: t("login.error"),
            life: 3000,
          });
        }
      }).bind(this);

      function login(credentials: any) {
        if (credentials.username.trim() === "")
          throw new Error("The user name must be provided");
        if (credentials.password.trim() === "")
          throw new Error("The password must be provided ");

        request.sendRequest(
          `${import.meta.env.VITE_API_PATH}/login`,
          credentials,
          "POST",
          loginRequestHandler
        );
      }

      return reactive({ loading: request.loading, login });
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
