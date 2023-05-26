<script setup>
import formatCurrency from '../helpers/formatCurrency';

import { useCartStore } from '../stores/CartStore';
const cartStore = useCartStore();
</script>

<template>
  <section class="cart__info">
    <h3>Resumo da compra</h3>

    <div>
      <p>Subtotal</p>
      <span>{{ formatCurrency(cartStore.subTotal) }}</span>
    </div>

    <div>
      <p>Valor da entrega</p>
      <span v-if="cartStore.deliveryTax === null">A calcular</span>
      <span v-else>{{ formatCurrency(cartStore.deliveryTax) }}</span>
    </div>

    <div class="total">
      <p>Valor total</p>
      <span>{{ formatCurrency(cartStore.totalValue) }}</span>
    </div>
  </section>
</template>

<style scoped>
.cart__info {
  margin-top: 3rem;
  padding: 2.5rem 0;
  border-top: 1px solid #343435;
}

.cart__info h3 {
  margin-bottom: 1rem;
}

.cart__info div {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: .5rem;
}

.cart__info span {
  color: var(--white);
}

.total p,
.total span {
  font-size: 1.25rem;
  font-weight: 600;
}
</style>