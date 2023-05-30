<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';

import Carousel from '../components/Carousel.vue';

import api from '../services/api';
import formatCurrency from '../helpers/formatCurrency';

import { useCartStore } from '../stores/CartStore';

const route = useRoute();
const product = ref();
const cartStore = useCartStore();
const $q = useQuasar();

const getProduct = async (id) => {
  await api.get(`/products/${id}`)
    .then(response => {
      product.value = response.data;
    })
    .catch(error => console.error(error));
}

function showNotification() {
  $q.notify({
    message: 'Produto adicionado ao carrinho',
    color: 'positive',
    icon: 'check_circle',
    position: 'top',
    timeout: 3000
  });
}

onMounted(getProduct(route.params.id));

</script>

<template>
  <div class="product" v-if="product">
    <div class="product__container">
      <Carousel :images="product.images" />

      <div class="product__content">
        <h2 class="product__name">{{product.title}}</h2>

        <div class="product__description">
          <p>Descrição</p>
          <p>{{product.description}}</p>
        </div>
      </div>
    </div>

    <div class="bottomsheet">
      <div>
        <h2>{{ formatCurrency(product.price) }}</h2>
        <p>Ou até 3x de R$ {{ formatCurrency(product.price / 3) }} sem juros</p>
      </div>

      <router-link to="/cart" @click="[cartStore.addToCart(product), showNotification()]">
        Comprar
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.product {
  display: flex;
  flex-direction: column;

  min-height: 100vh;
}

.product__content {
  margin: 0 auto;
  width: 90%;
}

.product__name {
  margin-top: 1rem;
}

.product__description {
  border-top: 2px solid #343435;
  border-bottom: 2px solid #343435;
  padding: 1rem 0;
  margin: 1rem 0;
}

.product__description p {
  margin: .5rem 0;
}
.bottomsheet {
  background: var(--red);
  padding: 1rem 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: auto;
}

.bottomsheet h2 {
  font-weight: 600;
  font-size: 1.25rem;
}

.bottomsheet p {
  font-size: .875rem;
}

.bottomsheet a {
  color: var(--white);
  font-weight: 600;
}

.bottomsheet a:hover{
  text-decoration: underline;
}

@media(min-width: 800px){
  .product__container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 2rem;
  }

  .product__content{
    margin: auto;
  }

  .bottomsheet{
    justify-content: space-around;
    padding: 1rem 2rem;
  }
}
</style>