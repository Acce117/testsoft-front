<template>
  <div>
    <h2>En la categoría <strong>{{ props.category?.name }}</strong> usted se caracteriza por:</h2>
    <span>
      <strong>{{ props.category?.items.name }}</strong>, con una puntuación de <strong>{{ props.category?.items.value }}</strong
      >, lo que se considera un valor
      <strong>{{ props.category?.items.indicator }}</strong
      >.<br />
    </span>
    <span>El elemento <strong>{{ props.category?.items.name }}</strong> consiste en: <br> {{
        props.category?.items.description
      }}</span><br>
      <span>Descripción de la categoría <strong>{{ props.category?.name }}</strong>:<br>
        {{ props.category?.description }}
      </span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  category: Object,
});
</script>
