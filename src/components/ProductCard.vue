<script setup>
import formatCurrency from '../helpers/formatCurrency';
const props = defineProps(['img', 'title', 'value', 'id']);
</script>

<template>
  <router-link :to="`/product/${props.id}`" class="product">
    <img v-bind:src="props.img" alt="Produto" loading="lazy">
    <p class="product__title">{{props.title}}</p>
    <p class="product__value">{{formatCurrency(props.value)}}</p>
  </router-link>

</template>

<style scoped>
.product {
  margin-bottom: .75rem;
  display: block;
}

.product img {
  max-width: 225px;
  border-radius: 8px;
}

.product__title {
  font-weight: 600;
}

@media(min-width: 550px){
  .product img {
  max-width: 250px;
}

}
</style>