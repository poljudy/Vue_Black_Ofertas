<script setup>
import { useQuasar } from 'quasar';

import BottomNav from '../components/BottomNav.vue';
import CartInfo from '../components/CartInfo.vue';
import CartProduct from '../components/CartProduct.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import EmptyCartIcon from '../components/EmptyCartIcon.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

import { useCartStore } from '../stores/CartStore';
const cartStore = useCartStore();

const $q = useQuasar();

const finishCheckout = () => {
  showNotification();
  cartStore.emptyCart();
}

function showNotification() {
  $q.notify({
    message: 'Compra realizada com sucesso',
    color: 'positive',
    icon: 'check_circle',
    position: 'top',
    timeout: 4000
  });
}
</script>

<template>
  <Header/>

  <section class="cart">
    <h2 v-if="!cartStore.isEmpty">Carrinho</h2>

    <div class="cart__empty" v-if="cartStore.isEmpty">
      <EmptyCartIcon />
      <p>Carrinho vazio</p>
    </div>

    <div class="cart__area" v-if="!cartStore.isEmpty">
      <CartProduct v-for="item in cartStore.items" :key="item.id" :id="item.id" :img="item.images[0]"
        :alt="item.description" :name="item.title" :value="item.price"
        :quantity="item.quantity" />

      <CartInfo />

    </div>

    <PrimaryButton v-if="!cartStore.isEmpty" to="/home" label="Finalizar compra" @click="finishCheckout" />
  </section>

  <BottomNav />
  <Footer />
</template>

<style scoped>
.cart {
  padding: 3rem 2rem;
}

.cart h2 {
  margin-bottom: 1.5rem;
}

.cart__empty {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 4rem 0;
}

.cart__empty p {
  margin-top: 1rem;
  margin-right: 1rem;
}

@media(min-width: 800px){
  .cart__empty{
    padding: 6rem 0 8rem 0;
  }
}
</style>