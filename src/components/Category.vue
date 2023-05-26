<script setup>
import { onMounted, ref } from 'vue';
import ProductCard from './ProductCard.vue';
import api from '../services/api';

const props = defineProps(['name']);
const products = ref([]);

const fetchProducts = async (name) => {
  await api.get(`/products/category/${name}`)
    .then((response) => {
      products.value = response.data;
    })
    .catch(error => console.error(error));
}

onMounted(fetchProducts(props.name));
</script>

<template>
  <section class="category">
    <p>{{ name }}</p>

    <div class="category__products">
      <ProductCard v-for="product in products" :key="product.id" :img="product.image"
        :title="product.title" :value="product.price" :id="product.id" />
    </div>
  </section>
</template>

<style scoped>
.category {
  margin-bottom: 1.5rem;
}

.category p {
  margin-bottom: .5rem;
}

.category__products {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>