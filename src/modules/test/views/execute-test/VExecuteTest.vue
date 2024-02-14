<script setup lang="ts">
import VTestSerie from "./VTestSerie.vue";
import { useRouter } from "vue-router";
import Dialog from "primevue/dialog";
import Steps from "primevue/steps";
import { provide, reactive, ref, watch } from "vue";
import { getTest } from "@/modules/test/test";
import { Test } from "../../classes/test-class";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const router = useRouter();
const serieIndex = ref(0);

const { result, loading } = getTest(
  router.currentRoute.value.params.id_test as string
);
let timeCountdown: number;

watch(result, (newValue) => {
  timeCountdown = newValue.time_duration * 60 * 1000;
});
const exitTestVisible = ref(false);
const saveTestVisible = ref(false);
const testEndedVisible = ref(false);
const testEnded2ndVisible = ref(false);
const infoVisible = ref(false);
const validatedTestFirstTime = ref(false);

provide("validatedTestFirstTime", validatedTestFirstTime);

let timeOutIdToast: number;
//TODO possible elimination of the setTimeout function because the toastcounter improve the fluidity of the app already
const endTest = () => {
  clearTimeout(timeOutIdToast);
  toast.removeAllGroups();
  let isValid = true;//This is for validating test
  let toastCounter = 0; //This is for restricting the amount of toast messages in dom
  result.value.arrayserie.forEach((serie) => {
    const questionsNotAnswered = test.getQuestionsNotAnswered(serie.arrayquestion);//for each serie, this function returns the incorrect answers. This is for managing questions and series in toast
    if (questionsNotAnswered.length > 0) {
      isValid = false;
      questionsNotAnswered.forEach((question) => {
        let errorMessage;
        switch (parseInt(question.question.fk_id_type_question)) {
          case 2:
            errorMessage = "Debe seleccionar una respuesta";
            break;
          case 5:
            errorMessage = "Existen puntos por asignar aún";
            break;
        }
        errorMessage+=` en la pregunta ${question.questionIndex}, ${serie.name}`
        if(toastCounter<10){
          toast.add({
          severity: "error",
          summary: "Error",
          detail: errorMessage,
          life: 10000,
        });
        toastCounter+=1
        }
        
      });
      timeOutIdToast = setTimeout(() => {//this is for deleting the toast to avoid close animations because they slow down the process  
        toast.removeAllGroups();
      }, 3000);
    }
  });
  if (isValid) test.sendTest();
  validatedTestFirstTime.value = true;
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
let timeOutIdTestEnded: number;
const testEnded = () => {
  if (firtsTimeEnd) {
    testEndedVisible.value = true;
    timeCountdown = 5 * 60 * 1000;
    firtsTimeEnd = false;
  } else {
    timeOutIdTestEnded = setTimeout(() => {
      router.push("/");
    }, 5000);
    testEnded2ndVisible.value = true;
  }
};
const testEnded2nd = () => {
  clearTimeout(timeOutIdTestEnded);
  router.push("/");
};

const test = reactive(new Test());

provide<Test>("test", test);
</script>
<template>
  <div class="test" v-if="!loading">
    <Toast position="top-left" />
    <div class="test__header">
      <div class="test__header__content">
        <h2 class="page-title">
          {{ result.name }}
        </h2>
        <div class="test__serie__navigation">
          <button
            class="black-button"
            :class="{
              'p-disabled': !(serieIndex > 0 && result.navigable == 1),
            }"
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
            :class="{
              'p-disabled': !(serieIndex < result.arrayserie.length - 1),
            }"
            class="black-button"
            @click="nextSerie()"
            v-tooltip.bottom="'Siguiente Serie'"
            placeholder="Bottom"
          >
            <img src="/img/arrow.svg" alt="siguiente serie" />
          </button>
        </div>
      </div>
    </div>

    <div class="test__content">
      <h3 class="page-subtitle">
        {{ result.arrayserie[serieIndex].description }}
      </h3>
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
      <div class="test__buttons">
        <button
          class="black-button"
          @click="endTest()"
          v-tooltip.right="'Terminar Test'"
          placeholder="Right"
        >
          <img src="/img/test_completed.svg" alt="terminar test" />
        </button>
        <button
          class="black-button"
          @click="infoVisible = true"
          v-tooltip.right="'Información'"
          placeholder="Right"
        >
          <img src="/img/info.svg" alt="info" />
        </button>
        <button
          class="black-button"
          @click="exitTestVisible = true"
          v-tooltip.right="'Cancelar Test'"
          placeholder="Right"
        >
          <img src="/img/cancel.svg" alt="cancelar test" />
        </button>
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
.navbar {
  background-color: white;
}
.test__content {
  position: relative;
  margin-top: 16rem;
}
.test__header {
  position: absolute;
  align-items: end;

  display: flex;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(1.2rem);
  -webkit-backdrop-filter: blur(1.2rem);
  z-index: 1;
  width: 100%;
  top: 0;
  height: 15rem;
  box-shadow: var(--shadow);
  animation: slide-in-from-top 0.5s ease;
}
.test__header__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 9rem;
}
.test__header h2 {
  width: 20rem;
  margin: 0 0.5rem;
}

.test__buttons,
.test__serie__navigation {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}
.test__serie__navigation {
  flex: 1;
  margin-bottom: 1rem;
}
.test__buttons {
  position: fixed;
  flex-direction: column;
  right: 1rem;
  padding: 0.5rem;
}

.test__timer {
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: var(--shadow);
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  font-size: 2rem;
  width: 11rem;
  height: 6rem;
  top: 18rem;
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

@media (min-width: 768px) {
  .test__header h2 {
    width: 50rem;
  }
  .test__serie__navigation {
    margin-bottom: 0;
  }
}
</style>
@/common/utils/validateAnswers
