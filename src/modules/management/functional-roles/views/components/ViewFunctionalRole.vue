<template>
  <div flex flex-col gap-2>
    <span><span text-primary>{{$t('general.name')}}: </span>{{ functionalRole.rol_name }}</span>
    <span><span text-primary>{{$t('general.description')}}: </span>{{ functionalRole.rol_descrip }}</span>
    

  </div>
</template>
<script setup lang="ts">
import "vue3-treeselect/dist/vue3-treeselect.css";
import { useI18n } from "vue-i18n";
const functionalRole = defineModel()
const { t } = useI18n();
</script>
