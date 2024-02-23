<template>
  <h2>Tus roles preferidos son:</h2>
  <div v-for="(role, index) in props.testResult.result.Preferred" :key="role.item">
    <span
      ><strong
        >{{ index + 1 }}-Con {{ role.value_result }} puntos,
        {{ role.item.name }} ({{ role.item.category.name }}):</strong
      ><br />
      {{ role.item.description }}</span
    >
  </div>
  <h2>Tus roles evitados son:</h2>
  <div v-for="(role, index) in props.testResult.result.Avoided" :key="role.item">
    <span
      ><strong
        >{{ index + 1 }}-Con {{ role.value_result }} puntos,
        {{ role.item.name }} ( {{ role.item.category.name }}):</strong
      ><br />
      {{ role.item.description }}</span
    >
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  testResult: Object,
});
</script>
