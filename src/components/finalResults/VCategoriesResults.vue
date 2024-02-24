<template>
  <div  v-for="category in props.testResult.result.categories">
    <h2>En la categoría <strong>{{ category.name }}</strong> usted se caracteriza por:</h2>
    <span>
      <strong>{{ category.items.name }}</strong>, con una puntuación de <strong>{{ category.items.value }}</strong
      >, lo que se considera un valor
      <strong>{{ category.items.indicator }}</strong
      >.<br />
    </span>
    <span>El elemento <strong>{{ category.items.name }}</strong> consiste en: <br> {{
        category.items.description
      }}</span><br>
      <span>Descripción de la categoría <strong>{{ category.name }}</strong>:<br>
        {{ category.description }}
      </span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  testResult: Object,
});
</script>
