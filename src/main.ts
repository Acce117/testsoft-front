import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import Tooltip from 'primevue/tooltip';




const app = createApp(App)

app.use(router)
app.use(PrimeVue);
app.mount('#app')
app.directive('tooltip', Tooltip);

/*app.use(PrimeVue, {
    unstyled: true
});*/
