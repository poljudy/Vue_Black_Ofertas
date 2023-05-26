<script>
export default {
  props: ['to', 'label']
}
</script>

<template>
  <q-btn outline style="color: white;" text-color="white" unelevated no-caps :ripple="{ center: true }"
    class="transparent" padding="1rem 0" dense :label="label" :to="to" />
</template>

<style scoped>
.q-btn {
  letter-spacing: 1px;
  margin-top: 1rem;
  width: calc(100% - 2px);
}
</style>