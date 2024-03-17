import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import ConfirmationService from 'primevue/confirmationservice';
import { isUserAuthenticated } from './modules/security/isUserAuthenticated';
import Tooltip from 'primevue/tooltip';
import 'primevue/resources/themes/aura-light-green/theme.css'
import { createPinia } from 'pinia';
import VueCountdown from '@chenfengyuan/vue-countdown';
import './assets/main.css'
import App from './App.vue'
import router from './router'
import VLoading from './components/VLoading.vue';
import VError from './components/VError.vue';
import Ripple from 'primevue/ripple';
import { i18n } from "./plugins/i18n";
import 'uno.css'


const app = createApp(App)

app.component('vue-countdown', VueCountdown);
app.component('VLoading', VLoading);
app.component('VError', VError);
app.directive('ripple', Ripple);
app.directive('tooltip', Tooltip);

app.use(router)
app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(ConfirmationService);
app.use(DialogService);
app.use(createPinia()).mount('#app')
app.use(i18n);

if (!isUserAuthenticated())
    router.push('/login')

