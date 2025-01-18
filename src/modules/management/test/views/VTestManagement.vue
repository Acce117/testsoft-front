<template>

  <CustomTable ref="table" title="Test" :model="test" hide-edit :extra-options="[{
    renderIf: (value: Test) => value.done == true,
    icon: 'pi pi-paperclip',
    tooltip: 'table.assign',
    action: (value) => {assignVisible=true; test.setData(value)}
  }, {
    renderIf: (value: Test) => value.done == false,
    icon: 'pi pi-file-edit',
    tooltip: 'table.edit',
    action: (value) => table.showUpdate(value)
  }]" :query-options="{
    relations: [
      {
        name: 'type_psi_test'
      }
    ]
  }" :customAddFunction="addFunction" :customUpdateFunction="updateFunction">

    <template #view-element>
      <ViewTest v-model="test" />
    </template>
    <template #custom-dialog>
        <AssignTest v-if="assignVisible" :refetch="()=>table.refetch()" v-model="test" v-model:visible="assignVisible" />
    </template>
  </CustomTable>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import CustomTable from "@/components/CustomTable.vue";
import router from "@/router";
import { Test } from "@/modules/management/test/models/test.model";
import ViewTest from "./components/ViewTest.vue";
import AssignTest from "./components/AssignTest.vue";
const { t } = useI18n();
const table = ref()
const assignVisible = ref(false)
let test = ref(new Test({ name: '', description: '', time_duration: 0, recurring_time: 0, navigable: false, done: false, completed: false, language: 'es', fk_id_type_test: 1 }))
const addFunction = async () => {
  const newTest = await test.value.create()
  router.push(`/create-test/${newTest.id_test}`)
}

const updateFunction = async (id: number) => {
  router.push(`/update-test/${id}`)
}

</script>
