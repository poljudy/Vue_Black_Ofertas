<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

import api from '../services/api';
import formatCurrency from '../helpers/formatCurrency';

import CartInfo from '../components/CartInfo.vue';
import CartProduct from '../components/CartProduct.vue';
import FormButton from '../components/FormButton.vue';
import Option from '../components/Option.vue';
import PrimaryButton from '../components/PrimaryButton.vue';

import { useAuthStore } from '../stores/AuthStore';
import { useCartStore } from '../stores/CartStore';
import { useLojaStore } from '../stores/LojaStore';

const authStore = useAuthStore();
const cartStore = useCartStore();
const lojaStore = useLojaStore();

const $q = useQuasar();
const router = useRouter();

const payments = {
  CREDIT_CARD: 1,
  MONEY: 2,
  PIX: 3
}

const currentStep = ref(0);
const address = ref();
const delivery = ref(null);
const payment = ref(null);
const change = reactive({
  needed: null,
  quantity: null
});

function goToNextStep() {
  if (currentStep.value === 0) {
    if (delivery.value === null) {
      return;
    }
  }

  if (currentStep.value === 1) {
    if (!payment.value) {
      return;
    }

    if (payment.value === 2) {
      currentStep.value += 1;
      return;
    } else {
      currentStep.value += 2;
      return;
    }
  }

  if (currentStep.value === 2) {
    if (change.needed === null) {
      return;
    }

    if (change.needed && change.quantity === null) {
      return;
    }
  }

  currentStep.value += 1;
}

function backToPrevStep() {
  if (currentStep.value === 0) {
    authStore.logout();
    router.push({ path: '/access' });
  }

  if (currentStep.value === 1) {
    delivery.value = null;
  }

  if (currentStep.value === 2) {
    payment.value = null;
  }

  if (currentStep.value === 3) {
    if (payment.value === payments.MONEY) {
      currentStep.value -= 1;
      return;
    } else {
      currentStep.value -= 2;
      payment.value = null;
      return;
    }
  }

  currentStep.value -= 1;
}

const getAddress = async (id) => {
  if (!(authStore.user === null)) {
    await api.get(`/enderecos/?consumer__id=${id}`)
      .then(response => {
        address.value = {
          id: response.data[0].id,
          city: response.data[0].city.name,
          uf: response.data[0].city.uf,
          cep: response.data[0].cep,
          number: response.data[0].number,
          street: response.data[0].street
        }
      });

    mountAddress(address);
  }
}

const mountAddress = (address) => {
  return `${address?.street}, ${address?.number} - ${address?.cep} / ${address?.city}, ${address?.uf}`
}

const handleDelivery = (boolean) => {
  delivery.value = boolean;

  if (delivery.value) {
    cartStore.setDeliveryTax(cartStore.subTotal * 0.1);
  } else {
    cartStore.setDeliveryTax(0);
  }
}

const handlePayment = (value) => {
  payment.value = value;
}

const handleChange = (boolean) => {
  change.needed = boolean;

  if (!change.needed) {
    change.quantity = null;
  }
}

function showNotification() {
  $q.notify({
    message: 'Compra realizada com sucesso',
    color: 'positive',
    icon: 'check_circle',
    position: 'top',
    timeout: 4000
  });
}

const finishCheckout = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const order = {
    items: cartStore.getItems,
    store: lojaStore.slug,
    consumer: authStore.user.id,
    phone: authStore.user.phone,
    address: address.value.id,
    total_price: cartStore.totalValue.toFixed(2),
    payment: payment.value,
    delivery: delivery.value
  }

  await api.post('/pedidos/', order, config)
    .then(response => {
      showNotification();
      cartStore.emptyCart();
      authStore.logout();
    })
    .catch(error => console.error(error));
}

onMounted(getAddress(authStore.user?.id));
</script>

<template>
  <div class="container">
    <q-icon name="arrow_back_ios" size="30px" color="white" @click="backToPrevStep" />

    <template v-if="authStore.user">
      <header v-if="currentStep !== 2">
        <div class="checkout__info">
          <h2>Finalizar compra</h2>
          <p>Confira as informações abaixo antes de finalizar a compra do produto.</p>
        </div>
      </header>

      <template v-if="currentStep === 0">
        <form>
          <legend class="checkout__description">Onde você quer receber?</legend>

          <Option name="delivery" id="store" label="Retirar na loja" @input="handleDelivery(false)" />

          <Option name="delivery" :id="address?.id" :label="mountAddress(address)" @input="handleDelivery(true)" />

          <q-btn color="white" icon="add" text-color="blue-10" label="Adicionar endereço" class="full-width"
            padding="1rem 0" no-caps unelevated />

          <FormButton text="Avançar" @click.prevent="goToNextStep" />
        </form>
      </template>

      <template v-if="currentStep === 1">
        <form>
          <legend class="checkout__description">Pagar pelo app</legend>

          <Option name="payment" id="pix" label="PIX" @click="handlePayment(payments.PIX)" />

          <legend class="checkout__description">Pagar na entrega</legend>

          <Option name="payment" id="card" label="Cartão de crédito" @click="handlePayment(payments.CREDIT_CARD)" />
          <Option name="payment" id="money" label="Dinheiro" @click="handlePayment(payments.MONEY)" />

          <FormButton text="Avançar" @click.prevent="goToNextStep" />
        </form>
      </template>

      <template v-if="currentStep === 2">
        <header>
          <div class="checkout__info">
            <h2>Dinheiro</h2>
            <p>Complemente a informação abaixo para finalizarmos a sua compra.</p>
          </div>
        </header>

        <div>
          <form>
            <legend class="checkout__description">Você irá precisar de troco?</legend>

            <Option name="money" id="yes" label="Sim" @click="handleChange(true)" />
            <Option name="money" id="no" label="Não" @click="handleChange(false)" />

            <p class="checkout__description">Troco para quanto?</p>
            <input type="number" :disabled="!change.needed" v-model="change.quantity">

            <FormButton text="Avançar" @click.prevent="goToNextStep" />
          </form>
        </div>
      </template>

      <div v-if="currentStep === 3">
        <CartProduct v-for="item in cartStore.items" :key="item.id" :id="item.id" :img="item.images[0].image"
          :alt="item.short_description" :name="item.description" :value="item.stocks[0].unit_price"
          :quantity="item.quantity" />

        <div class="delivery__info">
          <p class="checkout__description">Endereço de entrega</p>

          <q-card v-if="delivery">
            <q-card-section>
              {{ mountAddress(address) }}
            </q-card-section>
          </q-card>

          <q-card v-else>
            <q-card-section>
              Retirar na loja
            </q-card-section>
          </q-card>
        </div>

        <div class="payment__info">
          <p class="checkout__description" v-if="payment === payments.PIX">Pagamento pelo app</p>
          <p class="checkout__description" v-else>Pagamento na entrega</p>

          <q-card v-if="payment === payments.PIX">
            <img src="../assets/img/qr-code.png" alt="Qr-code para pagamento pelo PIX" class="qr-code">

            <q-card-section>
              <div class="text-subtitle1">Código PIX</div>

              <div class="pix__info">
                <div class="text-subtitle1">{{ lojaStore.selectedStore.pix_key}} </div>
                <q-icon name="content_copy" />
              </div>
            </q-card-section>
          </q-card>

          <q-card v-if="payment === payments.CREDIT_CARD">
            <q-card>
              <q-card-section>
                Cartão de crédito
              </q-card-section>
            </q-card>
          </q-card>

          <q-card v-if="payment === payments.MONEY">
            <q-card-section>
              <div class="text-h6">Dinheiro</div>
              <div class="text-subtitle1" v-if="change.needed">Troco para {{ formatCurrency(change.quantity) }}</div>
              <div class="text-subtitle1" v-else>Sem troco</div>
            </q-card-section>
          </q-card>
        </div>

        <CartInfo />

        <PrimaryButton to="/home" label="Finalizar compra" @click="finishCheckout" />
      </div>

    </template>

    <template v-else>
      <div class="no-checkout">
        <h2>Para comprar,<br> faça login ou cadastre-se</h2>
      </div>
    </template>
  </div>
</template>

<style scoped>
.checkout__info {
  margin-top: 2rem;
}

.checkout__info p {
  margin: 1rem 0;
}

.checkout__description {
  margin: 1.5rem 0;
  font-weight: 500;
}

input {
  width: 100%;
  margin-bottom: 2rem;
}

.q-card {
  font-size: 1.2rem;
  padding: .5rem 0;
}

.delivery__info,
.payment__info {
  border-top: 1px solid #343435;
}

.qr-code {
  width: 220px;
  margin: auto;
}

.pix__info {
  display: flex;
  justify-content: space-between;
}

.no-checkout {
  height: 70vh;

  display: flex;
  justify-content: center;
  align-items: center;
}

.no-checkout h2 {
  font-size: 1.75rem;
}
</style>