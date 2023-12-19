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


// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.component(VueCountdown.name, VueCountdown);

app.mount('#app')
app.use(Toastify);