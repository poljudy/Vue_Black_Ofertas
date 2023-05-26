<script>
export default {
  props: ['to', 'label']
}
</script>

<template>
  <q-btn color="red" text-color="white" unelevated no-caps :ripple="{ center: true }" class="full-width"
    padding="1rem 0" dense :label="label" :to="to" />
</template>

<style scoped>
.q-btn {
  letter-spacing: 1px;
}
</style>