<script setup>
import { useCartStore } from '../stores/CartStore';
import formatCurrency from '../helpers/formatCurrency';

const props = defineProps({
  id: Number,
  img: String,
  alt: String,
  name: String,
  value: Number,
  quantity: Number
})

const cartStore = useCartStore();
let quantity = props.quantity;
</script>

<template>
  <div class="cart__product">
    <div class="card__left">
      <img :src="props.img" :alt="props.alt">

      <div>
        <p>{{ props.name }}</p>
        <span>{{ formatCurrency(props.value) }}</span>

        <select v-model="quantity" @change="cartStore.setQuantity(props.id, quantity)">
          <option value="1">1 unidade</option>
          <option value="2">2 unidades</option>
          <option value="3">3 unidades</option>
          <option value="4">4 unidades</option>
          <option value="5">5 unidades</option>
          <option value="6">6 unidades</option>
          <option value="7">7 unidades</option>
          <option value="8">8 unidades</option>
          <option value="9">9 unidades</option>
          <option value="10">10 unidades</option>
        </select>
      </div>
    </div>

    <q-icon name="delete" size="30px" color="red-12" @click="cartStore.deleteItem(props.id)" />
  </div>
</template>

<style>
.cart__product {
  background: var(--white);
  padding: 1rem;
  border-radius: 4px;

  margin-bottom: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card__left {
  display: flex;
}

.card__left img {
  width: 80px;
  height: 80px;
  margin-right: 1rem;
}

.card__left div {
  display: flex;
  flex-direction: column;
}

.cart__product p {
  color: var(--blue);
  font-weight: 600;
  margin-bottom: .25rem;
}

.cart__product span {
  color: var(--grey);
  font-weight: 600;
}

.cart__product select {
  margin-top: 1rem;

  border: none;
}
</style>