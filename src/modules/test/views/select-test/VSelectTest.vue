<script setup lang="ts">
import VTestCard from "./components/VTestCard.vue";
import { ref, watch } from "vue";

import { userStore } from "@/modules/security/store/user-store";
const user = userStore();
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { Test } from "@/modules/management/test/models/test.model";
import router from "@/router";
import Paginator from "@/components/Paginator.vue";
import { SelectButton } from "primevue";
import { useI18n } from "vue-i18n";


const { t, locale } = useI18n()


const queryFunction = async (params) => {

  const tests = await new Test().getAssignedTests(userStore().user_id, params)
  user.assignedTests = [];

  const testsToReturn = []

  tests.data.forEach((test: any) => {
    let availableDate: Date = null;
    let canIncludeTest = true
    if (test.test_apps.length > 0) {
      availableDate = new Date(test.test_apps[test.test_apps.length - 1].date);

      if (availableDate < new Date()) {
        canIncludeTest = false
      }
      availableDate.setFullYear(
        availableDate.getFullYear() + parseInt(test.recurring_time)
      );
    }

    user.assignedTests.push({
      id: test.id_test,
      availabilityTime: availableDate,
    });

    if (filterMode.value.value == 'todos' || (filterMode.value.value == 'disponibles' && canIncludeTest)) {
      testsToReturn.push(test)
    }


    sessionStorage.setItem("user", JSON.stringify(user.$state));
  });

  tests.data = testsToReturn

  return tests
}


const paginator = ref()
const dialogVisible = ref(false)
const showDialog = (test: Test) => {
  selectedTest.value = test
  dialogVisible.value = true
}

const selectedTest = ref();

const executeTest = () => {
  router.push(`/execute-test/${selectedTest.value.id_test}`);
};
const filterOptions = ref([
  { name: t('available'), value: 'disponibles' },
  { name: t('all'), value: 'todos' }

])

const filterMode = ref({ name: 'Disponibles', value: 'disponibles' },)

const onFilterOptions = () => {
  paginator.value.refetch()
}

watch(locale, () => {
  filterOptions.value[0].name = t('available')
  filterOptions.value[1].name = t('all')
});

</script>
<template>



  <Paginator ref="paginator" :query-function="(params) => queryFunction(params)"
    gridClass="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"
    :query-key="'users-current-group'">
    <template #header>
      <h2 text-left>{{ t('title') }}</h2>
      <div class="flex ">
        <SelectButton v-model="filterMode" :default-value="filterOptions[0] ? filterOptions[0] : null"
          :options="filterOptions" optionLabel="name" @change="onFilterOptions" />
      </div>
    </template>
    <template #item-template="{ data }">
      <VTestCard :test="data" @show-dialog="(value) => showDialog(value)" />
    </template>
  </Paginator>




  <Dialog v-if="selectedTest" v-model:visible="dialogVisible" modal :header="selectedTest.name"
    class="w-4/5 max-w-50rem min-w-25rem">


    <div class="pt-4">
      <div class="flex flex-col justify-between text-base text-justify items-start gap-2 mb-4">

        <span class="font-medium text-surface-500  ">{{ selectedTest.description
        }}</span>

      </div>
      <div class="dialog-footer">
        <Button type="button" id="cancel-button" :label="$t('global.cancel')" severity="secondary"
          @click="dialogVisible = false"></Button>
        <Button type="button" id="start-button" :label="$t('global.start')" @click="executeTest"></Button>
      </div>
    </div>
  </Dialog>

</template>
<style>
.test-img {
  background: -webkit-linear-gradient(0deg, #3faee4, black)
}

.p-carousel-viewport {
  min-height: 18rem !important;
}
</style>
<i18n lang="json">{
  "es": {
    "title": "Seleccione un test para realizar",
    "available": "Disponibles",
    "all": "Todos"
  },
  "en": {
    "title": "Select a test",
    "available": "Available",
    "all": "All"
  }
}</i18n>
