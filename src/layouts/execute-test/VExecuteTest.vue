<script setup lang="ts">
import VGeneral from "@/layouts/general/VGeneral.vue";
import VTestSerie from "@/modules/test/views/VTestSerie.vue";
import { useRouter } from "vue-router";
import Dialog from "primevue/dialog";
import {areRadioGroupsChecked} from '@/common/utils/radioGroupsValidation'
import { ref } from "vue";
import { Test } from "@/modules/test/classes/test";
const router = useRouter();

const saveTestVisible = ref(false);
const errorVisible = ref(false);

const validateAnswers = () => {
    if(areRadioGroupsChecked()){
        saveTestVisible.value=true
    }else errorVisible.value = true

}

const { test, loading } = Test.getTest(router.currentRoute.value.params.id_test as string);

</script>
<template>
  <VGeneral>
    <h2 class="page-title">Test</h2>
    <button class="black-button" @click="validateAnswers()">
        Terminar Test
      </button>
    <div class="test">
      <VTestSerie v-if="!loading" :serie="test?.series[0]"/>
      <!--TODO some kind of cool loading message-->
      <h1 v-else>Loading</h1>
    </div>

    <Dialog
      v-model:visible="saveTestVisible"
      modal
      header="Test"
      class="modal box-shadow-box"
      ><span class="modal__background-shape"></span>
      <span class="modal__message">Desea guardar los resultados del test?</span>
      <div class="modal__buttons">
        <button class="black-button" @click="router.push('/')">Aceptar</button>
        <button class="black-button" @click="saveTestVisible = false">Cancelar</button>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="errorVisible"
      modal
      header="Error"
      class="modal box-shadow-box"
      ><span class="modal__background-shape"></span>
      <span class="modal__message"
        >Todos las preguntas deben ser respondidas</span
      >
      <div class="modal__buttons">
        <button class="black-button" @click="errorVisible = false">Aceptar</button>
      </div>
    </Dialog>
  </VGeneral>
</template>
<style>
@media (min-width: 480px) {
}

@media (min-width: 768px) {
}
</style>
