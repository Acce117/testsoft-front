<template>
  <div flex flex-col gap-2>
    
  </div>
</template>
<script setup lang="ts">
import "vue3-treeselect/dist/vue3-treeselect.css";
import { useI18n } from "vue-i18n";
import type { Test } from "../../models/test.model";
import type { ModelRef } from "vue";
const test:ModelRef<Test> = defineModel({required:true})
const { t } = useI18n();
</script>
