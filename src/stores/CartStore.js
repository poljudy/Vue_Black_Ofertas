import { defineStore } from 'pinia';

export const useCartStore = defineStore('CartStore', {
  state: () => {
    return {
      items: [],
      subTotal: 0,
      deliveryTax: null,
      totalValue: 0
    }
  },
  persist: {
    storage: sessionStorage,
    paths: ['items', 'subTotal', 'deliveryTax', 'totalValue']
  },

  actions: {
    addToCart(product) {
      const MAX_QUANTITY = 10;

      if (this.contains((product))) {
        const found = this.find(product.id);

        found.quantity === MAX_QUANTITY
          ? found.quantity = MAX_QUANTITY
          : found.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }

      this.calculateSubtotal();
      this.calculateTotalValue();
    },

    contains(product) {
      return this.items.map(item => item.id).includes(product.id);
    },

    find(id) {
      return this.items.find(item => item.id === id);
    },

    setQuantity(id, newQuantity) {
      const found = this.find(id);
      found.quantity = Number(newQuantity);

      this.calculateSubtotal();
      this.calculateTotalValue();
    },

    calculateSubtotal() {
      let total = 0;

      for (let item of this.items) {
        total += (item.price * item.quantity);
      }

      this.subTotal = total;
    },

    calculateTotalValue() {
      this.totalValue = this.subTotal + this.deliveryTax;
    },

    deleteItem(id) {
      const index = this.items.map(item => item.id).findIndex((itemId => itemId === id));
      this.items.splice(index, 1);

      this.calculateSubtotal();
      this.calculateTotalValue();
    },

    setDeliveryTax(quantity) {
      this.deliveryTax = quantity;
      this.calculateTotalValue();
    },

    emptyCart() {
      this.items = [];
      this.subTotal = 0;
      this.deliveryTax = null;
      this.totalValue = 0;
      sessionStorage.removeItem('CartStore');
    }
  },

  getters: {
    isEmpty: (state) => state.items.length === 0,

    count: (state) => state.items.length,

    getItems: (state) => {
      let items = [];

      for (let item of state.items) {
        let itemToPush = {
          unit_price: item.stocks[0].unit_price,
          product: item.id,
          quantity: item.quantity
        }

        items.push(itemToPush);
      }

      return items;
    }

  }
});