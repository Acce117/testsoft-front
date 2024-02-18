import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';
import 'primevue/resources/themes/aura-light-green/theme.css'
import Tooltip from 'primevue/tooltip';
import VueCountdown from '@chenfengyuan/vue-countdown';
import VLoading from './components/VLoading.vue';
import VError from './components/VError.vue';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import ConfirmationService from 'primevue/confirmationservice';
import { isUserAuthenticated } from './modules/security/isUserAuthenticated';

const app = createApp(App)

app.component('vue-countdown', VueCountdown);
app.component('VLoading', VLoading);
app.component('VError', VError);

app.use(router)
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
app.use(DialogService);
app.use(createPinia());
app.mount('#app')
app.directive('tooltip', Tooltip);

if (!isUserAuthenticated)
    router.push('/login')