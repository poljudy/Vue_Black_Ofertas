<script setup>
import { ref } from 'vue';
import { useCartStore } from '../stores/CartStore';

const tab = ref('home');
const cartStore = useCartStore();
</script>

<template>
  <q-tabs v-model="tab" class="bg-white text-gray hide-for-desktop" active-color="blue-10" no-caps>
    <q-route-tab name="home" icon="home" label="Página Inicial" to="/home" />
    <q-route-tab name="cart" icon="shopping_cart" label="Carrinho" to="/cart">
      <q-badge color="red" floating rounded v-if="!cartStore.isEmpty">{{ cartStore.count }}</q-badge>
    </q-route-tab>
    <q-route-tab name="user" icon="person" label="Mais opções" to="/home" />
  </q-tabs>
</template>

<style scoped>
.q-tabs {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
}
.q-tab:active {
  color: var(--blue);
}

@media(min-width: 600px){
  .q-tab{
    margin: 0 3rem;
  }
}

</style>