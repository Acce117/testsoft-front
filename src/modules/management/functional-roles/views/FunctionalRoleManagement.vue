<template>
  <TableServerPagination ref="table" title="functional_role.title" :model="functionalRole"
  
    >
    
    <template #form-add>
      <AddFunctionalRole v-model="functionalRole"  />
    </template>
    <template #form-update>
      <AddFunctionalRole v-model="functionalRole" />
    </template>
    <template #view-element>
      <ViewFunctionalRole v-model="functionalRole" />
    </template>
  </TableServerPagination>
</template>
<script setup lang="ts">
import { FunctionalRole,  } from "../models/functional-role.model";
import { ref } from "vue";
import AddFunctionalRole from "./components/AddFunctionalRole.vue";
import ViewFunctionalRole from "./components/ViewFunctionalRole.vue";
import TableServerPagination from "@/components/table/TableServerPagination.vue";
const table = ref()
let functionalRole = ref(new FunctionalRole())
</script>
