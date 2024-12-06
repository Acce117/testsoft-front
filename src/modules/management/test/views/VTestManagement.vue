<template>

  <CustomTable title="Test" :model="test" >
    <!-- <template #form-add>
      <AddUser v-model="user" />
    </template>
    <template #form-update>
      <UpdateUser v-model="user" />
    </template>-->
    <template #view-element>
      <ViewTest v-model="test" />
    </template>
  </CustomTable>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import CustomTable from "@/components/CustomTable.vue";

import { Test } from "@/modules/test/models/test.model";
import ViewTest from "./components/ViewTest.vue";
const { t } = useI18n();

let test = ref(new Test())

</script>
