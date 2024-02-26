<template>
  <div>
    <span
      ><strong
        >-Con {{ props.element?.value_result }} puntos,
        {{ props.element?.item.name }} ({{ props.element?.item.category.name }}):</strong
      ><br />
      {{ props.element?.item.description }}</span
    >
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  element: Object,
});
</script>
