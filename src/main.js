import { createApp } from 'vue';
import App from './App.vue';

import router from './router';

import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

import { Quasar, Notify } from 'quasar';
import 'quasar/dist/quasar.css';
import '@quasar/extras/material-icons/material-icons.css';

import './assets/css/reset.css';
import './assets/css/global.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

createApp(App).use(router).use(pinia).use(Quasar, {
  plugins: {
    Notify
  }
}).mount('#app');
