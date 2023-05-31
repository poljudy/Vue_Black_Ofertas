<script setup>
import { onMounted, ref } from 'vue';
import Banner from '../components/Banner.vue';
import BottomNav from '../components/BottomNav.vue';
import Category from '../components/Category.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

import api from '../services/api';

const categories = ref([]);

const fetchCategories = async () => {
  await api.get('/categories')
    .then((response) => {
      for(let category of response.data){
        if(category.id <= 5)
          categories.value.push(category);
      }
    })
    .catch(error => console.error(error));
}

onMounted(fetchCategories);
</script>

<template>
  <div class="home center">
    <Header />
    <Banner />

    <div class="wrapper">
      <Category v-for="category in categories" :key="category.id" :id="category.id" :name="category.name" />
    </div>
  </div>

  <BottomNav />
  <Footer />
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