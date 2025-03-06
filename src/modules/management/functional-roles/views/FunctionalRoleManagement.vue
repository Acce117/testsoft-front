<template>
  <CustomTable ref="table" title="functional_role.title" :model="functionalRole"
  :query-options="{relations:['group']}"
    :custom-get-all-function="getFunctionalRoles">
    
    <template #form-add>
      <AddFunctionalRole v-model="functionalRole"  />
    </template>
    <template #form-update>
      <AddFunctionalRole v-model="functionalRole" />
    </template>
    <template #view-element>
      <ViewFunctionalRole v-model="functionalRole" />
    </template>
  </CustomTable>
</template>
<script setup lang="ts">
import { FunctionalRole,  } from "../models/functional-role.model";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import CustomTable from "@/components/table/CustomTable.vue";
import { userStore } from "@/modules/security/store/user-store";
import AddFunctionalRole from "./components/AddFunctionalRole.vue";
import ViewFunctionalRole from "./components/ViewFunctionalRole.vue";
const { t } = useI18n();
const table = ref()
let functionalRole = ref(new FunctionalRole())

const getFunctionalRoles =async  ()=>{
  let result = userStore().user_id == 1? await functionalRole.value.getFunctionalRolesByGroup(userStore().assignments[0].group_id):await functionalRole.value.getAll({relations:[]})
  return result 
}


</script>
