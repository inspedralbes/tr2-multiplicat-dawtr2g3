import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './router'


// imports dels css de primevue
import '/node_modules/primeflex/primeflex.css'
import 'primevue/resources/themes/lara-light-blue/theme.css';

// imports dels components de primevue
import Button from "primevue/button"
import InputText from "primevue/inputtext"

const app = createApp(App)

app.use(createPinia());
app.use(router);
app.use(PrimeVue);

// components de primevue
app.component('Button', Button);
app.component('InputText', InputText);

app.mount('#app')
