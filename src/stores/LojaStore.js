import { defineStore } from 'pinia';

import api from '../services/api';

export const useLojaStore = defineStore('LojaStore', {
  state: () => {
    return {
      selectedStore: null,
      slug: null
    }
  },
  persist: {
    storage: sessionStorage,
    paths: ['selectedStore', 'slug']
  },

  actions: {
    async getSelectedStore(slug) {
      await api.get(`/lojas/${slug}/`)
        .then(response => {
          this.selectedStore = response.data;
          this.slug = slug;
        })
    }
  }
})