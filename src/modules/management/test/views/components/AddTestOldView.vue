<template>
  <main bg-sky-300 w-screen h-screen  anim-fade-in-1>

    <LoadingPanel centered :loading="isTestPending || loading || isRefetching" :error="isError || error"
      :refetch="refetch" />
    <div  mt-6rem mb-2rem flex flex-col gap-4 mx-6 rounded-xl pa-.8rem relative min-h-40rem>
      <h2 my-0 text-slate-600 font-bold>Crea un test</h2>
      <Stepper pb-4    @update:value="(index) => reloadData(index)" value="1" h-full v-if="isSuccess">
        <StepList>

          <Step v-for="(step, index) in steps" :key="step" :value="`${index + 1}`">{{ $t('steps.'+step) }}</Step>
        </StepList>
        <StepPanels>
          <GeneralData :value="`${steps.indexOf('data') + 1}`" />
          <CategoriesAndItems :value="`${steps.indexOf('categories') + 1}`" />
          <SeriesAndQuestions :value="`${steps.indexOf('series') + 1}`" />
          <ResultVisualization :value="`${steps.indexOf('results') + 1}`" />
          <ClassificationsAndRanges :value="`${steps.indexOf('classifications') + 1}`" />
          <CloseTest :value="`${steps.indexOf('close') + 1}`" />


        </StepPanels>
      </Stepper>

    </div>
  </main>

</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";

import { provide, ref, type Ref } from "vue";
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
import CloseTest from "../../test-creation/steps/CloseTest.vue";
const { t } = useI18n();

const testBuilder = ref(new TestBuilder(new Test()))
const loading = ref(false)
const error = ref(false)



const relations = ref([{
  name: "type_psi_test",
},
{
  name: "equation",
},
])

const { isError, isSuccess, isRefetching, isPending: isTestPending, refetch } = useTest(
  router.currentRoute.value.params.id_test as string
  , (test: Test) => {
    let newKeys = { ...test }
    delete newKeys.name
    delete newKeys.description

    testBuilder.value.getTest().setData(test.name == '' ? newKeys : test)
    renderSteps()

  }, () => relations.value);

const makeAction = async (action: Promise, callBackOnSuccess: Function) => {
  handlePromise(action, loading, () => {
    refetch()
    callBackOnSuccess()
  })

}
const steps: Ref<string[]> = ref([])


const renderSteps = () => {
  steps.value = []
  steps.value.push('data')
  if (!testBuilder.value.getTest().isPsicometricTestWithEquation())
    steps.value.push('categories')
  steps.value.push('series', 'results')
  if (testBuilder.value.getTest().isPsicometricTest())
    steps.value.push('classifications')
  steps.value.push('close')
}
renderSteps()

provide('testBuilder', testBuilder)
provide('loading', loading)
provide('error', error)
provide('refetch', refetch)
provide('makeAction', makeAction)
provide('renderSteps', renderSteps)






const reloadData = async (index: string) => {
  const mode = steps.value[parseInt(index) - 1]
  relations.value = [{
    name: "type_psi_test",
  },
  {
    name: "equation",
  }]
  switch (mode) {
    case 'categories': relations.value.push({
      name: "category",
      relations: [
        {
          name: "items",
          relations: ['ranges']
        }],
    })

      break;

    case 'series': relations.value.push({
      name: "category",
      relations: ["items"],
    },

      {
        name: "series",
        relations: [
          {
            name: "questions",
            relations: [{
              name: "type",
            },
            // {
            //   name: "image",
            // },
            {
              name: "answers",
              relations: ["tribute", "correct_answer"],
            },
            {
              name: "top_value",
            },

            ]
          },

        ],
      })
      break;
    case 'results': relations.value.push({
      name: "display_parameters"
    })
      break;
    case 'classifications': relations.value.push({
      name: "classifications",
      relations: ["ranges"],

    })
      break;
  }
  await refetch()

}



</script>

<style>
.p-steps-list {
  gap: 2rem !important
}
</style>
