<template>
  <div flex flex-col gap-2>
    <span><span text-primary>Nombres: </span>{{ user.name }}</span>
    <span><span text-primary>Apellidos: </span>{{ user.last_name }}</span>
    <span><span text-primary>Nombre de Usuario: </span>{{ user.username }}</span>
    <span><span text-primary>Email: </span>{{ user.email }}</span>
  </div>
</template>
<script setup lang="ts">
import "vue3-treeselect/dist/vue3-treeselect.css";
import { useI18n } from "vue-i18n";
const user = defineModel()
const { t } = useI18n();
</script>
