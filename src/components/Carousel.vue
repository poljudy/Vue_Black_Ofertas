<script setup>
import { ref } from 'vue';

const props = defineProps({
  images: Array
});

const slide = ref(0);
const autoplay = ref(true);
</script>

<template>
  <q-carousel v-model="slide" animated arrows navigation infinite :autoplay="autoplay" control-color="red">

    <q-carousel-slide v-for="image in props.images" :name="props.images.findIndex(item => item === image)"
      :img-src="image" />

  </q-carousel>
</template>