<template>
  <div flex flex-col gap-2>
    <span><span text-primary>Nombres: </span>{{ test.name }}</span>
    <span><span text-primary>Descripción: </span>{{ test.description }}</span>
    <span><span text-primary>Tiempo de Duración (min): </span>{{ test.time_duration }}</span>
    <span><span text-primary>Tiempo para poder ser ejecutado nuevamente (años): </span>{{ test.recurring_time }}</span>

    <span><span text-primary>¿Es posible navegar por las diferentes series del test?: </span>{{ test.navigable?'Sí':'No' }}</span>
    <span><span text-primary>¿Es necesario chequear el completamiento para que el procesamiento del test sea correcto?: </span>{{ test.completed?'Sí':'No' }}</span>
    <span><span text-primary>Tiempo de Test: </span>{{ test.type_psi_test.type_test_name }}</span>

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
