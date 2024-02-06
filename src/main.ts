import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';
import 'primevue/resources/themes/aura-light-green/theme.css'
import Tooltip from 'primevue/tooltip';

//TODO loading component
//TODO improve routes
//TODO .env for routes

const app = createApp(App)

app.use(router)
app.use(PrimeVue);
app.use(createPinia());
app.mount('#app')
app.directive('tooltip', Tooltip);

/*app.use(PrimeVue, {
    unstyled: true
});*/
