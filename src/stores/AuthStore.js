import { defineStore } from 'pinia';

import api from '../services/api';
import router from '../router';

export const useAuthStore = defineStore('AuthStore', {
  state: () => {
    return {
      user: null
    }
  },
  persist: {
    storage: sessionStorage,
    paths: ['user']
  },

  actions: {
    async login(body) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      await api.post('/login/consumidor/', body, config)
        .then(response => {
          this.user = response.data;
          router.push({ path: '/checkout' });
        })
        .catch(error => {
          console.error(error.toJSON());
        });
    },

    async register(body) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      await api.post('/consumidores/', body, config)
        .then(response => {
          this.user = response.data;
          router.push({ path: '/checkout' });
        })
        .catch(error => {
          console.error(error.toJSON());
        });
    },

    logout() {
      this.user = null;
      sessionStorage.removeItem('AuthStore');
    }
  }
});