<template>
  <div>
    <span
      >Con <strong>{{ props.element?.value_result }}</strong> puntos,
      <strong
        >{{ props.element?.item.name }} ({{
          props.element?.item.category.name
        }})</strong
      >:<br />
      {{ props.element?.item.description }}</span
    >
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  element: Object,
});
</script>
