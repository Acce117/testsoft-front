<script setup lang="ts">
import VGeneral from "@/layouts/general/VGeneral.vue";
import VTestSerie from "@/modules/test/views/VTestSerie.vue";
import { useRouter } from "vue-router";
import Dialog from "primevue/dialog";
import { areRadioGroupsChecked } from "@/common/utils/radioGroupsValidation";
import { ref } from "vue";
import { getTest } from "@/modules/test/test";

const router = useRouter();
const serieIndex = ref(0);

const { test, loading, actualSerie } = getTest(
  router.currentRoute.value.params.id_test as string
);

const updateSerie = () => {
  actualSerie.value=null
  setTimeout(() => {
    actualSerie.value = test.value?.series[serieIndex.value]
  },1);
  
};

const saveTestVisible = ref(false);
const errorVisible = ref(false);

const validateAnswers = () => {
  if (areRadioGroupsChecked()) {
    saveTestVisible.value = true;
  } else errorVisible.value = true;
};

const nextSerie = () => {
  serieIndex.value += 1;
  updateSerie()
};
const prevSerie = () => {
  serieIndex.value -= 1;
  updateSerie()
};
</script>
<template>
  <VGeneral>
    <div class="test__buttons">
      <h2 class="page-title">Test : {{ actualSerie?.name }}</h2>

      <button
        class="black-button"
        v-if="serieIndex > 0"
        @click="prevSerie()"
        v-tooltip.bottom="'Serie Anterior'"
        placeholder="Bottom"
      >
        <img
          src="/img/arrow.svg"
          alt="serie anterior"
          style="transform: rotate(180deg)"
        />
      </button>
      <button
        class="black-button"
        @click="validateAnswers()"
        v-tooltip.bottom="'Terminar Test'"
        placeholder="Bottom"
      >
        <img src="/img/test_completed.svg" alt="terminar test" />
      </button>
      <button
        v-if="serieIndex < test?.series.length - 1"
        class="black-button"
        @click="nextSerie()"
        v-tooltip.bottom="'Siguiente Serie'"
        placeholder="Bottom"
      >
        <img src="/img/arrow.svg" alt="siguiente serie" />
      </button>
    </div>

    <div class="test">
      <div class="test__timer">
        <span>00:00</span>
        <img src="/img/timer.svg" alt="tiempo restante" />
      </div>
      <VTestSerie v-if="!loading" :serie="actualSerie" />
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
        <button class="black-button" @click="saveTestVisible = false">
          Cancelar
        </button>
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
        <button class="black-button" @click="errorVisible = false">
          Aceptar
        </button>
      </div>
    </Dialog>
  </VGeneral>
</template>
<style>
.test {
  position: relative;
}
.test__buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
}
.test__timer {
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: var(--shadow);
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 2rem;
  width: 10rem;
  height: 6rem;
  top: -6rem;
  left: -5.8rem;
  transition: all ease 0.3s;
}
.test__timer img {
  filter: invert();
  width: 3rem;
}
.test__timer:hover {
  left: -0.5rem;
  cursor: pointer;
}
@media (min-width: 480px) {
}

@media (min-width: 768px) {
}
</style>
