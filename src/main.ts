import { createApp } from "vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import DialogService from "primevue/dialogservice";
import ConfirmationService from "primevue/confirmationservice";
import { isUserAuthenticated } from "./modules/security/isUserAuthenticated";
import Tooltip from "primevue/tooltip";
import { createPinia } from "pinia";
import VueCountdown from "@chenfengyuan/vue-countdown";
import "./assets/main.css";
import App from "./App.vue";
import router from "./router";
import VLoading from "./components/VLoading.vue";
import VError from "./components/VError.vue";
import VInput from "./components/VInput.vue";
import Ripple from "primevue/ripple";
import { i18n } from "./plugins/i18n";
import "uno.css";
import VWhiteButton from "./components/buttons/VWhiteButton.vue";
import VBlackButton from "./components/buttons/VBlackButton.vue";
import VButtonsContainer from "./components/buttons/VButtonsContainer.vue";
import {
  VueQueryPlugin,
  type VueQueryPluginOptions,
} from "@tanstack/vue-query";
import { MyPreset } from "./plugins/primevue-preset";
import "primeicons/primeicons.css";

const app = createApp(App);
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
};
app.use(VueQueryPlugin, vueQueryPluginOptions);
app.component("vue-countdown", VueCountdown);
app.component("VLoading", VLoading);
app.component("VInput", VInput);
app.component("VWhiteButton", VWhiteButton);
app.component("VBlackButton", VBlackButton);

app.component("VButtonsContainer", VButtonsContainer);

app.component("VError", VError);
app.directive("ripple", Ripple);
app.directive("tooltip", Tooltip);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: false,
      cssLayer: false,
    },
  },
  ripple: true,
});
app.use(ToastService);
app.use(ConfirmationService);
app.use(DialogService);
app.use(i18n);
app.use(createPinia());
app.mount("#app");
if (!isUserAuthenticated()) router.push("/login");
