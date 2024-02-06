<script setup lang="ts">
import VTestSerie from "./VTestSerie.vue";
import { useRouter } from "vue-router";
import Dialog from "primevue/dialog";
import Steps from "primevue/steps";
import { areRadioGroupsChecked } from "@/common/utils/radioGroupsValidation";
import { ref } from "vue";
import { getTest } from "@/modules/test/test";

const router = useRouter();
const serieIndex = ref(0);
let timeCountdown = 70 * 1000;

const { result, loading } = getTest(
  router.currentRoute.value.params.id_test as string
);

const saveTestVisible = ref(false);
const errorVisible = ref(false);
const testEndedVisible = ref(false);
const testEnded2ndVisible = ref(false);

const validateAnswers = () => {
  if (areRadioGroupsChecked()) {
    saveTestVisible.value = true;
  } else errorVisible.value = true;
};

const nextSerie = () => {
  serieIndex.value += 1;
};
const prevSerie = () => {
  serieIndex.value -= 1;
};

const getSeriesNames = () => {
  let names = Array();
  if (result.value) {
    result.value.forEach((serie) => {
      names.push({ label: serie.name });
    });
  }
  return names;
};
let firtsTimeEnd = true;
let timeOutId: number;
const testEnded = () => {
  if (firtsTimeEnd) {
    testEndedVisible.value = true;
    timeCountdown = 30 * 1000;
    firtsTimeEnd = false;
  } else {
    timeOutId = setTimeout(() => {
      router.push("/");
    }, 5000);
    testEnded2ndVisible.value = true;
  }
};
const testEnded2nd = () => {
  clearTimeout(timeOutId);
  router.push("/");
};
</script>
<template>
  <!--TODO some kind of cool loading message-->
  <div v-if="!loading">
    <h2 class="page-title">Test : {{ result[serieIndex].name }}</h2>
    <div class="test__buttons">
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
        v-if="serieIndex < result.length - 1"
        class="black-button"
        @click="nextSerie()"
        v-tooltip.bottom="'Siguiente Serie'"
        placeholder="Bottom"
      >
        <img src="/img/arrow.svg" alt="siguiente serie" />
      </button>
    </div>
    <Steps
      :model="getSeriesNames()"
      v-model:activeStep="serieIndex"
      :readonly="false"
    />

    <div class="test">
      <div class="test__timer">
        <vue-countdown
          :time="timeCountdown"
          v-slot="{ minutes, seconds }"
          @end="testEnded()"
        >
          {{ (minutes>9)?minutes:`0`+minutes }}:{{ (seconds>9)?seconds:`0`+seconds }}
        </vue-countdown>
        <img src="/img/timer.svg" alt="tiempo restante" />
      </div>
      <VTestSerie :serie="result[serieIndex]" />
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
    <Dialog
      v-model:visible="testEndedVisible"
      modal
      header="Test"
      class="modal box-shadow-box"
      ><span class="modal__background-shape"></span>
      <span class="modal__message"
        >El tiempo del test ha terminado. Se agregarán 5 minutos más.</span
      >
      <div class="modal__buttons">
        <button class="black-button" @click="testEndedVisible = false">
          Aceptar
        </button>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="testEnded2ndVisible"
      modal
      header="Test"
      class="modal box-shadow-box"
      ><span class="modal__background-shape"></span>
      <span class="modal__message">El tiempo del test ha terminado</span>
      <div class="modal__buttons">
        <button class="black-button" @click="testEnded2nd()">Aceptar</button>
      </div>
    </Dialog>
  </div>
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
  justify-content: space-between;
  align-items: center;
  padding: .5rem;
  font-size: 2rem;
  width: 11rem;
  height: 6rem;
  top: 6rem;
  left: -7rem;
  transition: all ease 0.5s;
  z-index: 2;
}

.test__timer img {
  filter: invert();
  width: 3rem;
}

.test__timer:hover {
  left: 1rem;
  cursor: pointer;
}

@media (min-width: 480px) {
}

@media (min-width: 768px) {
}
</style>
