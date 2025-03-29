<template>
  <TableServerPagination ref="table" title="user.title" hideDelete hideEdit :query-options="{
    relations: [
      {
        name: 'country'
      },
      {
        name: 'assignments'
      }
    ]
  }" :model="user" :custom-get-all-function="getUsersByGroup" :extra-options="[
    {
      renderIf: (value: User) => value.enabled == true && value.user_id != userStore().user_id && value.user_id != 40,
      icon: 'pi pi-file-edit',
      tooltip: 'table.update',
      action: (value) => table.showUpdate(value)
    }
    ,
    {
      renderIf: (value: User) => value.enabled == true && value.user_id != userStore().user_id && value.user_id != 40,
      icon: 'pi pi-trash',
      tooltip: 'table.desactivate',
      action: (value, event) => table.desactivateElement(value, event)
    },
    {
      renderIf: (value) => value.enabled == false && value.user_id != userStore().user_id && value.user_id != 40,
      icon: 'pi pi-history',
      tooltip: 'table.recover',
      action: (value, event) => table.activateElement(value, event)
    }]">
    <template #header>
      <div w-full>
        <TreeSelect @change="(value) => { defaultValue = value; table.refetch() }" :defaultValue
          :placeholder="$t('user.filtergroup')" :options="groups" filter w-40 v-model="selectedGroup" />
      </div>

    </template>

    <template #form-add>
      <AddUser v-model="user" :selectedGroup="defaultValue" />
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
import { Group } from "../../group/models/group.model";
import { userStore } from "@/modules/security/store/user-store";
import TreeSelect from "primevue/treeselect";
import { useGroups } from "../../group/composables/useGroups";
import { User } from "../models/user.model";
import TableServerPagination from "@/components/table/TableServerPagination.vue";
const { t } = useI18n();
const table = ref()
let user = ref(new User({ assignments: [] }))

const { groups } = useGroups()
let defaultValue = {}
defaultValue[userStore().assignments[0].group_id] = true
const selectedGroup = ref({})


const getUsersByGroup = async (queryParams:object) => {
  const id_group = Object.keys(selectedGroup.value)[0]
  return await user.value.getUsersByGroup(queryParams,id_group ? id_group : userStore().assignments[0].group_id)
}
</script>
