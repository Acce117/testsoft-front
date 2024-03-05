<template>
  <div>
    <h2>
      En la categoría <strong>{{ props.category?.name }}</strong> usted se
      caracteriza por:
    </h2>

    <span>
      <strong>{{ props.category?.items.name }}</strong
      >, con una puntuación de <strong>{{ props.category?.items.value }}</strong
      ><span v-if="props.category?.items.arrayrange.length > 0"
        >, lo que se considera un valor
        <strong>{{ props.category?.items.indicator }}</strong></span
      >.<br />
    </span>
    <span
      >El elemento <strong>{{ props.category?.items.name }}</strong> consiste
      en:
      {{ props.category?.items.description }}</span
    ><br />
    <span
      >Descripción de la categoría <strong>{{ props.category?.name }}</strong
      >:
      {{ props.category?.description }}
    </span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  category: Object,
});
</script>
