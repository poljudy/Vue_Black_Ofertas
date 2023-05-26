<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

import { useAuthStore } from '../stores/AuthStore';

import FormButton from '../components/FormButton.vue';

const currentStep = ref(0);
const authStore = useAuthStore();

const steps = [
  {
    title: 'Endereço para entrega',
    description: 'Confirme os seus dados de entrega'
  },
  {
    title: 'Dados pessoais',
    description: 'Confirme os seus dados pessoais'
  },
  {
    title: 'Dados para acesso',
    description: 'Confirme os seus dados para acesso'
  }
]

const router = useRouter();

const person = {
  consumer: {
    birth_date: "",
    name: "",
    phone: "",
    cpf_cnpj: "",
    user: {
      username: "",
      password: ""
    }
  },
  address: {
    neighborhood: "",
    street: "",
    number: "",
    complement: "",
    cep: "",
    city: "",
    uf: ""
  }
}

const schema = yup.object().shape({
  cep: yup.string().min(10).required('Campo obrigatório'),
  uf: yup.string().min(2).max(2),

  birth_date: yup.string().required('Campo obrigatório'),
  cpf_cnpj: yup.string().min(11).required('Campo obrigatório'),
  name: yup.string().required('Campo obrigatório'),
  phone: yup.string().required('Campo obrigatório'),
  password: yup.string().min(8).required('Campo obrigatório'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Senhas não são iguais')
})

function isFirstStep() {
  return currentStep.value === 0;
}

function isLastStep() {
  return currentStep.value === steps.length - 1;
}

function backToPrevStep() {
  if (!isFirstStep()) {
    currentStep.value -= 1;
  } else {
    router.push({ path: '/access' });
  }
}

function goToNextStep() {
  if (!isLastStep()) {
    currentStep.value++;
  }
}

function submit() {
  const birthDate = new Date(person.consumer.birth_date).toISOString();
  person.consumer.birth_date = birthDate;
  authStore.register(JSON.stringify(person));
}
</script>

<template>
  <div class="container">
    <header>
      <q-icon name="arrow_back_ios" size="30px" color="white" @click="backToPrevStep" />

      <div class="form__info">
        <h2>Passo {{currentStep + 1}} de {{ steps.length }}</h2>
        <p>{{ steps[currentStep].description }}</p>
        <h3>{{ steps[currentStep].title }}</h3>
      </div>
    </header>

    <section>
      <Form @submit="submit" :validation-schema="schema">
        <template v-if="currentStep === 0">
          <div>
            <label for="cep">CEP</label>
            <Field name="cep" type="text" placeholder="Insira o seu CEP aqui ..." v-model="person.address.cep"
              v-mask="'##.###-###'" />
            <ErrorMessage name="cep" />
          </div>

          <div>
            <label for="street">Rua</label>
            <Field name="street" type="text" placeholder="Insira a rua aqui ..." v-model="person.address.street" />
          </div>

          <div>
            <label for="number">Número</label>
            <Field name="number" type="number" placeholder="Insira o número aqui ..." v-model="person.address.number" />
          </div>

          <div>
            <label for="complement">Complemento</label>
            <Field name="complement" type="text" placeholder="Insira o complemento aqui ..."
              v-model="person.address.complement" />
          </div>

          <div>
            <label for="neighborhood">Bairro</label>
            <Field name="neighborhood" type="text" placeholder="Insira o bairro aqui ..."
              v-model="person.address.neighborhood" />
          </div>

          <div>
            <label for="uf">Estado</label>
            <Field name="uf" type="text" placeholder="Insira o estado aqui ..." v-model="person.address.uf"
              v-mask="'AA'" />
          </div>

          <div>
            <label for="city">Cidade</label>
            <Field name="city" type="text" placeholder="Insira a cidade aqui ..." v-model="person.address.city" />
          </div>

          <FormButton text="Próximo" @click="goToNextStep" />
        </template>

        <template v-if="currentStep === 1">
          <div>
            <label for="name">Nome completo</label>
            <Field name="name" type="text" placeholder="Insira o seu nome aqui ..." v-model="person.consumer.name" />
            <ErrorMessage name="name" />
          </div>

          <div>
            <label for="cpf_cnpj">CPF</label>
            <Field name="cpf_cnpj" type="text" placeholder="Insira o seu CPF aqui ..."
              v-model="person.consumer.cpf_cnpj" />
            <ErrorMessage name="cpf_cnpj" />
          </div>

          <div>
            <label for="birth_date">Data de nascimento</label>
            <Field name="birth_date" type="date" placeholder="00/00/0000" v-model="person.consumer.birth_date" />
            <ErrorMessage name="birth_date" />
          </div>

          <div>
            <label for="phone">Telefone</label>
            <Field name="phone" type="tel" placeholder="(XX) XXXXX - XXXX" v-model="person.consumer.phone"
              v-mask="'(##) ##### - ####'" />
            <ErrorMessage name="phone" />
          </div>

          <FormButton text="Próximo" @click="goToNextStep" />
        </template>

        <template v-if="currentStep === 2">
          <div>
            <label for="username">Telefone</label>
            <Field name="username" type="tel" placeholder="(XX) XXXXX - XXXX" v-model="person.consumer.user.username"
              v-mask="'(##) ##### - ####'" />
          </div>

          <div>
            <label for="password">Senha</label>
            <Field name="password" type="password" placeholder="Insira a sua senha aqui..."
              v-model="person.consumer.user.password" />
          </div>

          <div>
            <label for="confirmPassword">Confirmar senha</label>
            <Field name="confirmPassword" type="password" placeholder="Confirme a sua senha aqui..." />
            <ErrorMessage name="confirmPassword" />
          </div>

          <FormButton text="Próximo" @click="submit" />
        </template>
      </Form>

    </section>
  </div>
</template>

<style scoped>
.form__info {
  margin-top: 2rem;
}

.form__info h3 {
  margin: 1.75rem 0;
}

form div {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.btn {
  margin: 3rem 0;
}

form span {
  color: var(--red);
  font-weight: 500;
  margin-top: .5rem;
}
</style>