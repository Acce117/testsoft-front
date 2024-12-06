<template>
  <div flex flex-col gap-2>
    <span><span text-primary>Nombres: </span>{{ test.name }}</span>
    <span><span text-primary>Descripción: </span>{{ test.description }}</span>
    <span><span text-primary>Tiempo de Duración (min): </span>{{ test.time_duration }}</span>
    

  </div>
</template>
<script setup lang="ts">
import "vue3-treeselect/dist/vue3-treeselect.css";
import { useI18n } from "vue-i18n";
const test = defineModel()
const { t } = useI18n();
</script>
