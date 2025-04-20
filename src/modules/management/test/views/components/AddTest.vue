<template>

  <Dialog v-model:visible="visible" modal :header="$t('table.create')" class="w-full  min-w-25rem">


    <div class="dialog-form" min-h-40rem>

      <LoadingPanel centered v-if="isTestPending || isRefetching || isError"
        :loading="isTestPending || loading || isRefetching" :error="isError || error" :refetch="refetch" />
      <div flex flex-col gap-4 relative min-h-40rem>

        <Stepper pb-4 @update:value="(index) => reloadData(index)" value="1" h-full>
          <StepList>
            <Step v-for="(step, index) in steps" :key="step" :value="`${index + 1}`">{{ $t('steps.' + step) }}</Step>
          </StepList>
          <StepPanels v-if="!isRefetching && !isTestPending">
            <GeneralData :forUpdate :value="`${steps.indexOf('data') + 1}`" />
            <Equation :value="`${steps.indexOf('equation') + 1}`" />
            <CategoriesAndItems :value="`${steps.indexOf('categories') + 1}`" />
            <SeriesAndQuestions :value="`${steps.indexOf('series') + 1}`" />
            <ResultVisualization :value="`${steps.indexOf('results') + 1}`" />
            <ClassificationsAndRanges :value="`${steps.indexOf('classifications') + 1}`" />
            <CloseTest :value="`${steps.indexOf('close') + 1}`" />


          </StepPanels>
        </Stepper>
      </div>

    </div>
  </Dialog>

</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";

import { provide, ref, type ModelRef, type Ref } from "vue";
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
import handlePromise from "@/common/utils/handlePromise";
import ClassificationsAndRanges from "../../test-creation/steps/ClassificationsAndRanges.vue";
import CloseTest from "../../test-creation/steps/CloseTest.vue";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { Dialog } from "primevue";
import LoadingPanel from "@/components/LoadingPanel.vue";
import Equation from "../../test-creation/steps/Equation.vue";
const { t } = useI18n();


const props = defineProps({
  forUpdate: {
    type: Boolean,
    default: false
  }
})

const model: ModelRef<Test> = defineModel({ required: true })
const visible: ModelRef<boolean> = defineModel("visible")
console.log(model.value)
const test = { ...model.value }

const testBuilder = ref(new TestBuilder(new Test(model.value)))
const loading = ref(false)
const error = ref(false)



const relations = ref([{
  name: "type_psi_test",
},
{
  name: "equation",
},
])

// const { isError, isSuccess, isRefetching, isPending: isTestPending, refetch } = useTest(
//   testBuilder.value
//   , (test: Test) => {
//     let newKeys = { ...test }
//     delete newKeys.name
//     delete newKeys.description
//     console.log('asdasdsad')
//     testBuilder.value.getTest().setData(test.name == '' ? newKeys : test)
//     renderSteps()

//   }, () => relations.value, false);

const getRelationsCb = () => relations.value

const { data, isPending: isTestPending, isSuccess, isRefetching, refetch, isError } =
  useQuery({
    queryKey: ["test"],
    queryFn: async () => {

      const test = testBuilder.value.getTest()
      if (test.id_test) {
        const relations = getRelationsCb();
        const testResponse = await Test.getOne(test.id_test, {
          relations: relations,
        });

        testResponse.fk_id_type_test = testResponse.type_psi_test.id_type_test;
        testBuilder.value.getTest().setData({ ...testResponse })
        renderSteps()

      } else {
        test.time_duration = 0
        test.recurring_time = 0
      }

      return test;

      // cb(test);

    },
  });

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
  console.log('asdsa')
  //if (testBuilder.value.getTest().isPsicometricTest())

  steps.value.push('equation')
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




const queryClient = useQueryClient()

const reloadData = async (index: string) => {
  queryClient.resetQueries({ 'queryKey': 'test' })
  const mode = steps.value[parseInt(index) - 1]
  relations.value = [{
    name: "type_psi_test",
  }
  ]
  switch (mode) {
    case 'equation': relations.value.push(
      {
        name: "equation",
      }
    )
      break;
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
.p-steplist {
  height: 6rem !important;
}

.p-steps-list {
  gap: 2rem !important
}
</style>
<i18n lang="json">{
  "es": {
    "series": "Series y Preguntas",
    "equation": "Fórmula para el cálculo de los resultados",
    "categories": "Categorías y Elementos",
    "classifications": "Clasificaciones",
    "close": "Cerrar Test",
    "results": "Visualización de resultados",
    "data": "Datos Generales"
  },
  "en": {
    "en": {
    "series": "Series and Questions",
    "equation": "Results calculation formula",
    "categories": "Categories and Elements",
    "classifications": "Classifications",
    "close": "Close Test",
    "results": "Results Display",
    "data": "General Data"
} }
}</i18n>
