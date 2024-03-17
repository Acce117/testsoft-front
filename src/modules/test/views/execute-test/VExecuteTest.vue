<script setup lang="ts">
import VTestSerie from "./VTestSerie.vue";
import VTestHeader from "./VTestHeader.vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import Dialog from "primevue/dialog";
import {
  provide,
  markRaw,
  reactive,
  ref,
  watch,
  defineAsyncComponent,
  onUnmounted,
} from "vue";
import { getTest } from "@/modules/test/test";
import { Test } from "../../classes/test-class";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useDialog } from "primevue/usedialog";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const VDialogFooter = defineAsyncComponent(
  () => import("@/components/dialog/VDialogFooter.vue")
);
const VDialogMessage = defineAsyncComponent(
  () => import("@/components/dialog/VDialogMessage.vue")
);
const VTestResult = defineAsyncComponent(() => import("./VTestResult.vue"));
const dialog = useDialog();
const toast = useToast();
const confirm = useConfirm();
const router = useRouter();
const { result, loading, error } = getTest(
  router.currentRoute.value.params.id_test as string
);
const test = reactive(new Test(router.currentRoute.value.params.id_test[0]));

provide<Test>("test", test);

const serieIndex = ref(0);
provide("serieIndex", serieIndex);

//TIMER

let timeCountdown = ref();

watch(result, (newValue) => {
  if (newValue) {
    let time: number;
    if (newValue.time_duration > 0) time = newValue.time_duration;
    else time = newValue.arrayserie[0].time_serie_duration;
    timeCountdown.value = time * 60001;
    test.name = newValue.name;
    test.type = newValue.fk_id_type_test;
  }
});
const setNewTime = (time: number) => {
  timeCountdown.value = time + 1;
  setTimeout(() => {
    timeCountdown.value = time;
  }, 0);
};
let hasSecondOpportunity = true;
const timeOver = () => {
  try {
    if (result.value.time_duration > 0) {
      if (hasSecondOpportunity) {
        setNewTime(300000);
        hasSecondOpportunity = false;
        toast.add({
          severity: "warn",
          summary: t("global.warning") + ":",
          detail: t("execute-test.dialogs.test-ended-first-time"),
          life: 5000,
        });
      } else throw new Error("Time Over");
    } else {
      if (serieIndex.value < result.value.arrayserie.length - 1) {
        serieIndex.value += 1;
        setNewTime(
          result.value.arrayserie[serieIndex.value].time_serie_duration * 60000
        );
        toast.removeAllGroups();
        toast.add({
          severity: "warn",
          summary: t("global.warning") + ":",
          detail: t("execute-test.dialogs.serie-ended"),
          life: 5000,
        });
      } else throw new Error("Time Over");
    }
  } catch (e: any) {
    if (e.message === "Time Over") {
      confirmExit = true;
      router.push("/select-test");
      timeOverDialog();
    } else console.error(e);
  }
};

const nextSerie = () => {
  if (result.value.navigable == 1) serieIndex.value += 1;
  else if (result.value.result?.completed == 1) {
    if (validateSerie(result.value.arrayserie[serieIndex.value]))
      nextSerieConfirm();
  } else nextSerieConfirm();
};
const nextSerieConfirm = () => {
  useConfirm().require({
    message: t("execute-test.dialogs.confirm-next-serie.message"),
    header: t("execute-test.dialogs.confirm-next-serie.title"),
    rejectLabel: t("global.cancel"),
    acceptLabel: t("global.confirm"),
    accept: () => {
      serieIndex.value += 1;
      setNewTime(
        result.value.arrayserie[serieIndex.value].time_serie_duration * 60000
      );
      validatedTestFirstTime.value = false;
    },
  });
};
//DIALOGS
const infoVisible = ref(false);
provide("dialogRef", dialog);

const exitTestConfirm = (route: string) => {
  confirm.require({
    message: t("execute-test.dialogs.confirm-exit-test.message"),
    header: t("execute-test.dialogs.confirm-exit-test.title"),
    rejectLabel: t("global.cancel"),
    acceptLabel: t("global.confirm"),
    accept: () => {
      exitTest(route);
    },
  });
};
const sendTestConfirm = () => {
  confirm.require({
    message: t("execute-test.dialogs.confirm-save-test.message"),
    header: t("execute-test.dialogs.confirm-save-test.title"),
    rejectLabel: t("global.cancel"),
    acceptLabel: t("global.confirm"),
    accept: () => {
      showResults();
      exitTest("");
    },
    reject: () => {
      confirmExit = false;
    },
  });
};
const showResults = () => {
  dialog.open(VTestResult, {
    props: {
      header: t("results.title"),
      modal: true,
    },
    templates: {},
    data: {
      test,
    },
  });
};

const timeOverDialog = () => {
  dialog.open(VDialogMessage, {
    props: {
      header: t("results.test"),
      modal: true,
    },
    templates: {
      footer: markRaw(VDialogFooter),
    },
  });
};

//TEST VALIDATION
const validatedTestFirstTime = ref(false);
provide("validatedTestFirstTime", validatedTestFirstTime);

const validateSerie = (serie: any) => {
  let isValid = true;
  const questionsNotAnswered = test.getQuestionsNotAnswered(
    serie.arrayquestion
  );
  if (questionsNotAnswered.length > 0) {
    isValid = false;
    getErrorMessages(questionsNotAnswered).forEach((error) => {
      toast.add({
        severity: "error",
        summary: "Error: " + serie.name,
        detail: error,
        life: 3000,
      });
    });
  }
  validatedTestFirstTime.value = true;
  return isValid;
};

const validateTest = () => {
  //for each serie, this function returns the incorrect answers. This is for managing questions and series in toast
  toast.removeAllGroups();
  let isValid = true;
  if (result.value.completed == 1) {
    result.value.arrayserie.forEach((serie: any) => {
      if (!validateSerie(serie)) isValid = false;
    });
  }
  if (isValid) sendTestConfirm();
};

//ROUTER
let confirmExit = false;
onBeforeRouteLeave((to, from) => {
  if (!error.value) {
    if (!confirmExit && to.name) {
      exitTestConfirm(to.name.toString());
      return false;
    }
  }
  confirm.close();
});

const exitTest = (route: string) => {
  confirmExit = true;
  router.push(`/` + route);
};

onUnmounted(() => {
  toast.removeAllGroups();
});

const questionsNotAnswered = {
  "2": Array(),
  "5": Array(),
};

const pushQuestionsNotAnswered = (questions: any[]) => {
  questions.forEach((question) => {
    switch (parseInt(question.question.fk_id_type_question)) {
      case 2:
        questionsNotAnswered["2"].push(question);
        break;
      case 5:
        questionsNotAnswered["5"].push(question);
        break;
      //ADD OTHERS QUESTION TYPES
    }
  });
};

const getErrorMessages = (questions: any[]) => {
  let errorMessages = Array();
  pushQuestionsNotAnswered(questions);
  for (let key in questionsNotAnswered) {
    if (questionsNotAnswered[key].length > 0) {
      let error = t(`execute-test.error.${key}`) + " ";
      if (questionsNotAnswered[key].length == 1)
        error += `${t("execute-test.error.in-question")} `;
      else error += `${t("execute-test.error.in-question")}s `;
      questionsNotAnswered[key].forEach((question: any, index: number) => {
        if (index > 0) {
          if (index == questionsNotAnswered[key].length - 1)
            error += ` ${t("global.and")} `;
          else error += ", ";
        }
        error += question.questionIndex;
      });
      errorMessages.push(error);
      questionsNotAnswered[key].splice(0, questionsNotAnswered[key].length);
    }
  }
  return errorMessages;
};
</script>
<template>
  <VError v-if="error" />
  <div v-else style="width: 100vw; height: 100vh">
    <div class="test" v-if="!loading">
      <VTestHeader :result="result" @next-serie="nextSerie()" />
      <div class="test__content" relative mt-64>
        <h3 page-subtitle>
          {{ result.arrayserie[serieIndex].description }}
        </h3>
        <div
          class="test__timer"
          ref="timer"
          hover:left-1rem
          hover:cursor-pointer
        >
          <vue-countdown
            :time="timeCountdown"
            v-slot="{ minutes, seconds }"
            @end="timeOver()"
          >
            {{ minutes > 9 ? minutes : `0` + minutes }}:{{
              seconds > 9 ? seconds : `0` + seconds
            }}
          </vue-countdown>
          <img
            src="/img/timer.svg"
            alt="tiempo restante"
            filter-invert
            w-3rem
          />
        </div>

        <div centered gap-1rem fixed flex-col right-1rem pa-0.5rem>
          <button
            class="white-button p-ripple"
            v-ripple
            @click="validateTest()"
            v-tooltip.right="t('execute-test.tooltips.save')"
            placeholder="Right"
          >
            <img src="/img/test_completed.svg" alt="terminar test" />
          </button>
          <button
            class="white-button p-ripple"
            v-ripple
            @click="infoVisible = true"
            v-tooltip.right="t('execute-test.tooltips.info')"
            placeholder="Right"
          >
            <img src="/img/info.svg" alt="info" />
          </button>
          <button
            class="white-button p-ripple"
            v-ripple
            @click="exitTestConfirm('select-test')"
            v-tooltip.right="t('execute-test.tooltips.exit')"
            placeholder="Right"
          >
            <img src="/img/cancel.svg" alt="cancelar test" />
          </button>
        </div>
        <VTestSerie :serie="result.arrayserie[serieIndex]" />
      </div>
      <Dialog
        v-model:visible="infoVisible"
        modal
        header="Información"
        style="width: 50%"
      >
        <span class="modal__long-message">
          <span font-bold>Descripción del test:</span> {{ result.description }}
          <br />
          Responda las preguntas en el tiempo asignado, que puede consultar en
          la parte izquierda de la pantalla a través del temporizador.<br />Utilice
          los botones del sector superior derecho para navegar entre series.<br />Los
          botones a la derecha se utilizan para guardar sus respuestas, mostrar
          información y salir del test respectivamente.
        </span>
      </Dialog>
    </div>
    <VLoading v-else />
  </div>
</template>

<style>
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
</style>
@/common/utils/validateAnswers ./getErrorMessages
