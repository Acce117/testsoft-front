<template>
  
      <CustomTreeTable title="Grupos" :model="group">
        <template #form-add>
        </template>
        <template #view-element>
        </template>
      </CustomTreeTable>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import CustomTreeTable from "@/components/CustomTreeTable.vue";
import { Group } from "../models/group.model";
const { t } = useI18n();

let group = ref(new Group())

</script>
