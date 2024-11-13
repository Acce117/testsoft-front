<template>
  
      <CustomTable title="Grupos" :model="group">
        <template #form-add>
        </template>
        <template #view-element>
        </template>
      </CustomTable>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import CustomTable from "@/components/CustomTable.vue";
import { Group } from "../models/group.model";
const { t } = useI18n();

let group = ref(new Group())

</script>
