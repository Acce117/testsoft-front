<template>
  <div v-for="category in props.testResult.result.categories">
    <h2>En la categoría {{ category.name }} usted se caracteriza por:</h2>
    <span>
      <strong
        >{{ category.items.name }} ({{ category.items.description }}):<br />
        {{ category.items.value }} puntos ({{
          category.items.indicator
        }})<br /> </strong
    ></span>
    <span>Info: {{ category.description }}</span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  testResult: Object,
});
</script>
