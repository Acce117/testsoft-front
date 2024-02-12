<script setup lang="ts">
import VTestSerie from "./VTestSerie.vue";
import { useRouter } from "vue-router";
import Dialog from "primevue/dialog";
import Steps from "primevue/steps";
import Sidebar from "primevue/sidebar";
import { provide, reactive, ref, watch } from "vue";
import { getTest } from "@/modules/test/test";
import { Test } from "../../classes/test-class";
import { isTestValid } from "@/common/utils/validateAnswers";
const router = useRouter();
const serieIndex = ref(0);

const { result, loading } = getTest(
  router.currentRoute.value.params.id_test as string
);
let timeCountdown: number;
let questions = Array();

watch(result, (newValue) => {
  timeCountdown = newValue.time_duration * 60 * 1000;
  newValue.arrayserie.forEach((serie) => {
    serie.arrayquestion.forEach((question) => {
      questions.push(question);
    });
  });
});
const topBarVisible = ref(false);
const exitTestVisible = ref(false);
const saveTestVisible = ref(false);
const errorVisible = ref(false);
const testEndedVisible = ref(false);
const testEnded2ndVisible = ref(false);
const infoVisible = ref(false);
const validatedTestFirstTime = ref(false);

provide("validatedTestFirstTime", validatedTestFirstTime);

const endTest = () => {
  if (isTestValid("2", test.answers, questions)) {
    test.sendTest();
  } else {
    errorVisible.value = true;
    validatedTestFirstTime.value = true;
  }
  topBarVisible.value = false
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
    result.value.arrayserie.forEach((serie: { name: string }) => {
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
    timeCountdown = 5 * 60 * 1000;
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

const test = reactive(new Test());

provide<Test>("test", test);
</script>
<template>
  <div v-if="!loading">
    <Sidebar v-model:visible="topBarVisible" position="top">
      <h2 class="page-title">
        {{ result.name }} : {{ result.arrayserie[serieIndex].name }}
      </h2>
      <h3 class="page-subtitle">
        {{ result.arrayserie[serieIndex].description }}
      </h3>
      
      <div class="test__buttons">
        <button
          class="black-button"
          @click="endTest()"
          v-tooltip.bottom="'Terminar Test'"
          placeholder="Bottom"
        >
          <img src="/img/test_completed.svg" alt="terminar test" />
        </button>
        <button
          class="black-button"
          @click="infoVisible = true"
          v-tooltip.bottom="'Información'"
          placeholder="Bottom"
        >
          <img src="/img/info.svg" alt="info" />
        </button>
        <button
          class="black-button"
          @click="exitTestVisible = true"
          v-tooltip.bottom="'Salir'"
          placeholder="Bottom"
        >
          <img src="/img/cancel.svg" alt="salir" />
        </button>
      </div>
    </Sidebar>

    <div class="test">
      <button
        class="topbar-button"
        @click="topBarVisible = true"
        v-tooltip.bottom="'Opciones'"
        placeholder="Bottom"
      >
        <img src="/img/arrow.svg" alt="opciones" />
      </button>
      <div class="test__buttons">
        <button
          class="black-button"
          :class="{'p-disabled':!(serieIndex > 0 && result.navigable == 1)}"
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
        <Steps
          :model="getSeriesNames()"
          v-model:activeStep="serieIndex"
          :readonly="result.navigable != 1"
        />
        <button
          :class="{'p-disabled':!(serieIndex < result.arrayserie.length - 1)}"
          class="black-button"
          @click="nextSerie()"
          v-tooltip.bottom="'Siguiente Serie'"
          placeholder="Bottom"
        >
          <img src="/img/arrow.svg" alt="siguiente serie" />
        </button>
      </div>
      <div class="test__timer">
        <vue-countdown
          :time="timeCountdown"
          v-slot="{ minutes, seconds }"
          @end="testEnded()"
        >
          {{ minutes > 9 ? minutes : `0` + minutes }}:{{
            seconds > 9 ? seconds : `0` + seconds
          }}
        </vue-countdown>
        <img src="/img/timer.svg" alt="tiempo restante" />
      </div>

      <VTestSerie
        :serie="result.arrayserie[serieIndex]"
        :answers="test.answers"
      />
      
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
      v-model:visible="exitTestVisible"
      modal
      header="Test"
      class="modal box-shadow-box"
      ><span class="modal__background-shape"></span>
      <span class="modal__message">Desea salir del test?</span>
      <div class="modal__buttons">
        <button class="black-button" @click="router.push('/')">Aceptar</button>
        <button class="black-button" @click="exitTestVisible = false">
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
    <Dialog
      v-model:visible="infoVisible"
      modal
      header="Descripción"
      class="modal box-shadow-box"
      ><span class="modal__background-shape"></span>
      <span class="modal__message modal__long-message">{{
        result.description
      }}</span>
      <div class="modal__buttons">
        <button class="black-button" @click="infoVisible = false">
          Aceptar
        </button>
      </div>
    </Dialog>
  </div>
  <VLoading v-else />
</template>

<style>
.test {
  margin-top: 6rem;
  position: relative;
}
.topbar-button{
  position: absolute;
  z-index: 1000;
  top: -4rem;
  margin: 0 50% ;
  box-shadow: none;
  background-color: transparent;
}
.topbar-button img{
  transform: rotate(90deg);
}
.p-sidebar {
  height: 30rem;
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
  padding: 0.5rem;
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

@media (min-width: 1024px) {
  .topbar-button img{
    filter: invert();
  }
}
</style>
@/common/utils/validateAnswers
