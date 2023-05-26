<script setup>
const props = defineProps(['text'])
</script>

<template>
  <button class="btn">{{ props.text }}</button>
</template>

<style scoped>
.btn {
  display: inline-block;
  width: 100%;

  background: var(--red);
  color: var(--white);

  padding: 1.5em 0;
  margin-top: 1rem;
  border-radius: 4px;

  font-size: 14px;
  letter-spacing: 1px;
  text-align: center;

}
</style>