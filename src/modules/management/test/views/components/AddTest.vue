<template>
  <div bg-white mt-6rem flex flex-col gap-4 mx-6 rounded-xl pa-.8rem>
    <h2 my-0 text-slate-600 font-bold>Crea un test</h2>

    <Stepper value="1" h-full>
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


        <StepPanel v-slot="{ activateCallback }" value="2">
          <div flex gap-6 flex-col>
            <h3 my-0 text-slate-600>Inserta las categorías y sus elementos</h3>


            <div class="flex pt-6 justify-between">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('3')" />
            </div>
          </div>

        </StepPanel>
        <SeriesAndQuestions />
        <ResultVisualization />



        <StepPanel v-slot="{ activateCallback }" value="5">
          <div flex gap-6 flex-col>
            <h3 my-0 text-slate-600>Configure la clasificación de resultados</h3>

            
            <div class="flex pt-6 justify-between">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('4')" />
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('6')" />
            </div>
          </div>
        </StepPanel>
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
import { Test } from "@/modules/test/models/test.model";
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



const { t } = useI18n();


const testBuilder = ref(new TestBuilder(new Test({ time_duration:0, recurring_time:0, fk_id_type_test: null, done: false, series: [] })))
provide('testBuilder', testBuilder)




</script>
