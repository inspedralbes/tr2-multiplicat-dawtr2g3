import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { useAppStore } from './stores/app'
import { storeToRefs } from 'pinia';
import Vuetify from 'vuetify'

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
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.use(Vuetify);

// components de primevue
app.component('Button', Button);
app.component('InputText', InputText);

app.mount('#app')
export const store = useAppStore();
