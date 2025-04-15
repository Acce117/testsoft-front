<template>
  {{ test }}
  <TableServerPagination ref="table" title="Test" :model="test"
    :visibleCreateButton="userStore().assignments[0].item_id != 4" :extra-options="[{
      renderIf: (value: Test) => value.done == true,
      icon: 'pi pi-paperclip',
      tooltip: 'table.assign',
      severity: 'success',
      action: (value) => { assignVisible = true; test.setData(value) }
    }]" :query-options="{
    relations: [
      {
        name: 'type_psi_test'
      },
      {
        name: 'authors'
      }
    ]
  }" custom-dialog-create-class="w-full" :custom-add-function="() => createVisible = true"
    :custom-update-function="() => updateVisible = true">

    <template #view-element>
      <ViewTest v-model="test" />
    </template>

    <template #custom-dialog>
      <AssignTest v-if="assignVisible" :refetch="() => table.refetch()" v-model="test" v-model:visible="assignVisible" />
      <AddTest v-if="createVisible" v-model:visible="createVisible" v-model="test" />
      <AddTest v-if="updateVisible" :for-update="true" v-model:visible="updateVisible" v-model="test" />

    </template>
  </TableServerPagination>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import router from "@/router";
import { Test } from "@/modules/management/test/models/test.model";
import ViewTest from "./components/ViewTest.vue";
import AssignTest from "./components/AssignTest.vue";
import { userStore } from "@/modules/security/store/user-store";
import TableServerPagination from "@/components/table/TableServerPagination.vue";
import { sendRequest } from "@/common/utils/sendRequest";
import AddTest from "./components/AddTest.vue";
const { t } = useI18n();
const table = ref()
const assignVisible = ref(false)
const createVisible = ref(false)
const updateVisible = ref(false)


let test = ref(new Test({ time_duration: 0, recurring_time: 0, done: false }))







</script>
