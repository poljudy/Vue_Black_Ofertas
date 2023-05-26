<script setup>
import BottomNav from '../components/BottomNav.vue';
import CartInfo from '../components/CartInfo.vue';
import CartProduct from '../components/CartProduct.vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import EmptyCartIcon from '../components/EmptyCartIcon.vue';

import { useCartStore } from '../stores/CartStore';
const cartStore = useCartStore();
</script>

<template>
  <section class="cart">
    <h2>Carrinho</h2>

    <div class="cart__empty" v-if="cartStore.isEmpty">
      <EmptyCartIcon />
      <p>Carrinho vazio</p>
    </div>

    <div class="cart__area" v-else>
      <CartProduct v-for="item in cartStore.items" :key="item.id" :id="item.id" :img="item.images[0].image"
        :alt="item.short_description" :name="item.description" :value="item.stocks[0].unit_price"
        :quantity="item.quantity" />

      <CartInfo />

      <PrimaryButton to="/access" label="Finalizar compra" />
    </div>
  </section>

  <BottomNav />
</template>

<style scoped>
.cart {
  padding: 3rem 2rem;
  margin-bottom: 4rem;
}

.cart h2 {
  margin-bottom: 1.5rem;
}

.cart__empty {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 8rem 0 14rem 0;
}

.cart__empty p {
  margin-top: 1rem;
  margin-right: 1rem;
}
</style>