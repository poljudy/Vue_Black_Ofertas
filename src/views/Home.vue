<script setup>
import { onMounted, ref } from 'vue';
import Banner from '../components/Banner.vue';
import BottomNav from '../components/BottomNav.vue';
import Category from '../components/Category.vue';
import api from '../services/api';

const categories = ref([]);

const fetchCategories = async () => {
  await api.get('/products/categories')
    .then((response) => {
      categories.value = response.data;
    })
    .catch(error => console.error(error));
}

async function filterProducts(search) {
  await api.get(`/categorias/lu_estilo/?${search}=08`)
    .then((response) => console.log(response.data));
}

onMounted(fetchCategories);
</script>

<template>
  <div class="home center">
    <Banner />

    <div class="wrapper">
      <input type="search" name="search" id="search" placeholder="Digite a busca aqui"
        @input="event => filterProducts(event.target.value)" />

      <Category v-for="category in categories" :key="category" :name="category" />
    </div>
  </div>

  <BottomNav />
</template>

<style scoped>
.home {
  margin-bottom: 4rem;
}

.wrapper {
  width: 90%;
}

input {
  width: 100%;
  border-radius: 8px;
  border: none;
  margin: 1.5rem 0;
  padding: 1.25rem;
}

input::placeholder {
  font-size: 1rem;
  letter-spacing: 0.0075em;
}

input:focus {
  outline: 2px solid var(--red);
}
</style>