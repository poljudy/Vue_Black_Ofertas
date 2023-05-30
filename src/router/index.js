import { createRouter, createWebHistory } from 'vue-router';

import Cart from '../views/Cart.vue';
import Home from '../views/Home.vue';
import Product from '../views/Product.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/home', redirect: '/' },
  { path: '/products/:id', component: Product },
  { path: '/cart', component: Cart },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;