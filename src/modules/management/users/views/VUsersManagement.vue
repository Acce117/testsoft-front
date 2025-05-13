<template>
  <TableServerPagination ref="table" title="user.title"
    :query-options="{
      relations: [
        {
          name: 'country'
        },
        {
          name: 'assignments'
        }
      ]
    }" :model="user" :custom-get-all-function="getUsersByGroup">
    
    <template #custom-filter-template-groups>
      <div flex w-full>
        
          <SelectGroup :refetch="()=>table.refetch()" ref="select" v-model="selectedGroup"/>
      </div>

    </template>

    <template #form-add>
      <AddUser v-model="user" :selectedGroup="selectedGroup" />
    </template>
    <template #form-update>
      <UpdateUser v-model="user" />
    </template>
    <template #view-element>
      <ViewUser v-model="user" />
    </template>
  </TableServerPagination>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import ViewUser from "./components/ViewUser.vue";
import AddUser from "./components/AddUser.vue";
import UpdateUser from "./components/UpdateUser.vue";

import { User } from "../models/user.model";
import TableServerPagination from "@/components/table/TableServerPagination.vue";
import { useUserGroup } from "@/common/utils/useUserGroup";
import SelectGroup from "@/components/SelectGroup.vue";
const { t } = useI18n();
const table = ref()
let user = ref(new User({ assignments: [] }))


const selectedGroup = ref({[useUserGroup()]:true})



const getUsersByGroup = async (queryParams: object) => {
  const id_group = Object.keys(selectedGroup.value)[0]
  return await user.value.getUsersByGroup(queryParams, id_group ? id_group : useUserGroup())
}
</script>
