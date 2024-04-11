/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import VueCountdown from '@chenfengyuan/vue-countdown';
import Toastify from 'toastify-js'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.component(VueCountdown.name, VueCountdown);
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

app.use(pinia)
app.mount('#app')
app.use(Toastify);