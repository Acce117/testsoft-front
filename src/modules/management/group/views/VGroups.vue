<template>
  
      <CustomTreeTable title="Grupos" :model="group">
        <template #form-add>
          <AddGroup v-model="group"/>
        </template>
        <template #form-update>
          <UpdateGroup v-model="group"/>
        </template>
        <template #view-element>
          <ViewGroup v-model="group"/>
        </template>
      </CustomTreeTable>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import CustomTreeTable from "@/components/CustomTreeTable.vue";
import { Group } from "../models/group.model";
import AddGroup from "./components/AddGroup.vue";
import ViewGroup from "./components/ViewGroup.vue";
import UpdateGroup from "./components/UpdateGroup.vue";
const { t } = useI18n();

let group = ref(new Group())

</script>
