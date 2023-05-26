<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';

import FormButton from '../components/FormButton.vue';

import { useAuthStore } from '../stores/AuthStore';

const authStore = useAuthStore();

const validateUsername = (value) => {
  if (value?.length < 17) {
    return 'Ops, este número é inválido';
  }

  return true;
}

const validatePassword = (value) => {
  if (value?.length < 8) {
    return 'Ops, esta senha é inválida';
  }

  return true;
}

const handleLogin = async (values) => {
  validateUsername(values.username);
  validatePassword(values.password);
  authStore.login(JSON.stringify(values));
}

</script>

<template>
  <div class="container">
    <router-link to="/access">
      <q-icon name="arrow_back_ios" size="30px" color="white" />
    </router-link>

    <div class="login__info">
      <h2>Acessar conta</h2>
      <p>Insira os dados da sua conta para poder continuar com o processo de compra.</p>
    </div>

    <Form @submit="handleLogin">
      <div>
        <label for="username">Telefone</label>
        <Field name="username" type="tel" placeholder="Insira o seu telefone aqui ..." v-mask="'(##) ##### - ####'"
          :rules="validateUsername" />
        <ErrorMessage name="username" />
      </div>

      <div>
        <label for="password">Senha</label>
        <Field name="password" type="password" placeholder="Insira a sua senha aqui ..." :rules="validatePassword" />
        <ErrorMessage name="password" />
      </div>

      <p>Esqueci minha senha</p>

      <FormButton text="Entrar" />
    </Form>
  </div>

</template>

<style scoped>
.login__info {
  margin-top: 2rem;
}

.login__info h2 {
  margin-bottom: .75rem;
}

form {
  margin-top: 3rem;
}

form div {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

form p {
  font-size: .875rem;
  text-align: center;
  margin: 2rem 0 1rem 0;
}

form small {
  color: var(--white);
  font-size: .875rem;
  margin-top: .5rem;
}

form span {
  color: var(--red);
  font-weight: 500;
  margin-top: .5rem;
}
</style>