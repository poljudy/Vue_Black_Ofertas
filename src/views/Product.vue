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
  await api.get(`/produtos/?ids=${id}`)
    .then(response => {
      product.value = response.data[0];
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
    <Carousel :images="product.images" />

    <div class="product__content">
      <h2 class="product__name">{{product.description}}</h2>

      <div class="product__description">
        <p>Descrição</p>
        <p>{{product.short_description}}</p>
      </div>

      <div class="product__comment">
        <p>Você quer adicionar alguma observação?</p>
        <input type="text" name="comment" id="comment" placeholder="Digite aqui...">
      </div>
    </div>

    <div class="bottomsheet">
      <div>
        <h2>{{ formatCurrency(product.stocks[0].unit_price) }}</h2>
        <p>Ou até 3x de R$ {{ formatCurrency(product.stocks[0].unit_price / 3) }} sem juros</p>
      </div>

      <router-link to="/cart" @click="[cartStore.addToCart(product), showNotification()]">
        Comprar
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.product {
  height: 100vh;

  display: flex;
  flex-direction: column;
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

.product__comment {
  margin-bottom: 1rem;
}

.product__comment input {
  width: 90%;
  border-radius: 8px;
  border: none;
  margin: 1rem 0;
  padding: 1em;
  font-size: 1rem;
}

.bottomsheet {
  background: var(--red);
  padding: 1rem;

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
</style>