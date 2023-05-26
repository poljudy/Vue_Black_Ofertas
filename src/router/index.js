import { createRouter, createWebHistory } from 'vue-router';

import Access from '../views/Access.vue';
import Cart from '../views/Cart.vue';
import Checkout from '../views/Checkout.vue';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Product from '../views/Product.vue';
import Register from '../views/Register.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/home', redirect: '/' },
  { path: '/product/:id', component: Product },
  { path: '/cart', component: Cart },
  { path: '/access', component: Access },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/checkout', component: Checkout }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;