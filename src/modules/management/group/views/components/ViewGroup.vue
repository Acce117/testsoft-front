<template>
  <div flex flex-col gap-2>
    <span><span text-primary>{{ $t('group.name_group') }}: </span>{{ group.name_group }}</span>
  </div>
</template>
<script setup lang="ts">
import "vue3-treeselect/dist/vue3-treeselect.css";
import { useI18n } from "vue-i18n";
const group = defineModel()
const { t } = useI18n();
</script>
