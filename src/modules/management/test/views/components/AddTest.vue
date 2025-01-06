<template>
  <LoadingPanel centered :loading="isTestPending || loading || isRefetching" :error="isError || error"
    :refetch="refetch" />

  <div bg-white mt-6rem flex flex-col gap-4 mx-6 rounded-xl pa-.8rem relative min-h-40rem>
    <h2 my-0 text-slate-600 font-bold>Crea un test</h2>
    <Stepper @update:value="refetch" value="1" h-full v-if="isSuccess">
      <StepList>
        <Step value="1">Datos Generales</Step>
        <Step value="2">Categorías y Elementos</Step>
        <Step value="3">Series y Preguntas</Step>
        <Step value="4">Visualización de Resultados</Step>
        <Step value="5">Clasificación de Resultados</Step>
        <Step value="6">Cerrar Test</Step>
      </StepList>
      <StepPanels>
        <GeneralData />
        <CategoriesAndItems />
        <SeriesAndQuestions />
        <ResultVisualization />
        <ClassificationsAndRanges />




        <StepPanel v-slot="{ activateCallback }" value="6">
          <div flex gap-6 flex-col>
            <h3 my-0 text-slate-600>Cerrar el test</h3>


            <div class="flex pt-6 justify-between">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('5')" />
            </div>
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>

  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";

import { provide, ref } from "vue";
import { Test } from "@/modules/management/test/models/test.model";
import Stepper from "primevue/stepper";
import StepList from "primevue/steplist";
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import StepPanels from 'primevue/steppanels';
import Button from "primevue/button";

import GeneralData from "../../test-creation/steps/GeneralData.vue";
import SeriesAndQuestions from "../../test-creation/steps/SeriesAndQuestions.vue";
import ResultVisualization from "../../test-creation/steps/ResultVisualization.vue";
import { TestBuilder } from "../../classes/TestBuilder";
import CategoriesAndItems from "../../test-creation/steps/CategoriesAndItems.vue";
import { useTest } from "../../composables/useTest";
import router from "@/router";
import LoadingPanel from "@/components/LoadingPanel.vue";
import handlePromise from "@/common/utils/handlePromise";
import ClassificationsAndRanges from "../../test-creation/steps/ClassificationsAndRanges.vue";
const { t } = useI18n();

const testBuilder = ref(new TestBuilder(new Test()))
const loading = ref(false)
const error = ref(false)


const { isError, isSuccess, isRefetching, isPending: isTestPending, refetch } = useTest(
  router.currentRoute.value.params.id_test as string
  , (test: Test) => {
    let newKeys = {...test}
    delete newKeys.name
    delete newKeys.description
    testBuilder.value.getTest().setData(test.name == '' ? newKeys : test)
  }
);

const makeAction = async (action: Promise, callBackOnSuccess: Function) => {
  handlePromise(action, loading, () => {
    refetch()
    callBackOnSuccess()
  })

}

provide('testBuilder', testBuilder)
provide('loading', loading)
provide('error', error)
provide('refetch', refetch)
provide('makeAction', makeAction)







</script>
