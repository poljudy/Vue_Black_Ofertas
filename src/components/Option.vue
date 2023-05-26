<script setup>
const props = defineProps(['name', 'id', 'label']);
</script>

<template>
  <label :for="props.id" class="option">
    <input type="radio" :name="props.name" :id="props.id" required><span>{{ props.label }}</span>
  </label>
</template>

<style scoped>
.option {
  background: var(--white);
  padding: 1.25rem;
  border-radius: 4px;
  margin-bottom: 1.25rem;

  display: flex;
  align-items: flex-start;
}

.option input {
  margin-right: 1rem;
}

.option span {
  color: var(--gray);
  font-size: 1.2rem;
}

input[type='radio'] {
  accent-color: var(--red);
}
</style>