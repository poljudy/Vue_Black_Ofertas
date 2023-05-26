<script>
import PrimaryButton from '../components/PrimaryButton.vue';
import SecondaryButton from '../components/SecondaryButton.vue';

export default {
  name: 'Access',
  components: {
    PrimaryButton,
    SecondaryButton
  }

}
</script>

<template>
  <div class="container">
    <router-link to="/home" class="close">
      <q-icon name="close" size="30px" color="white" />
    </router-link>

    <h2>Acesse sua conta ou cadastre-se!</h2>
    <p>Para continuar o processo de compra, escolha uma das opções abaixo.</p>

    <div>
      <PrimaryButton to="/login" label="Já sou cliente" />
      <SecondaryButton to="/register" text="Criar nova conta" />
    </div>
  </div>
</template>

<style scoped>
.close {
  display: inline-block;
  margin-bottom: 6rem;
}

.container h2 {
  margin-bottom: 1rem;
}

.container div {
  margin-top: 3rem;
}
</style>