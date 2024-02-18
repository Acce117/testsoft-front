import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';
import 'primevue/resources/themes/aura-light-green/theme.css'
import { createPinia } from 'pinia';
import VueCountdown from '@chenfengyuan/vue-countdown';

import './assets/main.css'
import App from './App.vue'
import router from './router'
import VLoading from './components/VLoading.vue';
import VError from './components/VError.vue';

const app = createApp(App)

app.component('vue-countdown', VueCountdown);
app.component('VLoading', VLoading);
app.component('VError', VError);
app.component('ConfirmDialog', ConfirmDialog);

app.use(router)
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
app.use(createPinia());
app.mount('#app')
app.directive('tooltip', Tooltip);

router.push('/login')