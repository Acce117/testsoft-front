<template>

  <CustomTable title="Test" :model="test" :customAddFunction="addFunction" :customUpdateFunction="updateFunction">
    <!-- 
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
import router from "@/router";
import { Test } from "@/modules/management/test/models/test.model";
import ViewTest from "./components/ViewTest.vue";
const { t } = useI18n();

let test = ref(new Test({ name: '', description: '', time_duration: 0, recurring_time: 0, navigable: false, done: false, completed: false, language: 'es', fk_id_type_test: 1 }))
const addFunction = async () => {
  const newTest = await test.value.create()
  router.push(`/create-test/${newTest.identifiers[0].id_test}`)
}

const updateFunction = async (id:number) => {
  router.push(`/update-test/${id}`)
}

</script>
