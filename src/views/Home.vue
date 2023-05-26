<script setup>
import { onMounted, ref } from 'vue';
import Banner from '../components/Banner.vue';
import BottomNav from '../components/BottomNav.vue';
import Category from '../components/Category.vue';
import api from '../services/api';

const categories = ref([]);

const fetchCategories = async () => {
  await api.get('/categories')
    .then((response) => {
      for(let category of response.data){
        if(category.id != 7 && category.id != 11){
          categories.value.push(category)
        }
      }
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
      <div class="input">
        <input type="search" name="search" id="search" placeholder="Digite a busca aqui"
          @input="event => filterProducts(event.target.value)" />
      </div>

      <Category v-for="category in categories" :key="category.id" :id="category.id" :name="category.name" />
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
.input{
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  width: 60%;
  border-radius: 8px;
  border: none;
  margin: 2rem 0;
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