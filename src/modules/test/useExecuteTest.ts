import useEvents from "@/common/utils/useEvents";
import { i18n } from "@/plugins/i18n";
import router from "@/router";
import { ref, type Ref } from "vue";
import type { TestAplication } from "./classes/testAplication";
import VTestResult from "./views/execute-test/VTestResult.vue";
const { t } = i18n.global;

export const useExecuteTest = () => {
  const confirmExit = ref(false);
  const validatedTestFirstTime = ref(false);
  const infoVisible = ref(false);

  const serieIndex = ref(0);
  let data = ref();
  let test = ref();
 
   const setData=(d:any)=>data=d;
   const setTest=(d:any)=>test=d;

   




  const validateSerie = (serie: any, test:TestAplication) => {
    let isValid = true;
    const questionsNotAnswered = test.getQuestionsNotAnswered(
      serie.questions
    );
    if (questionsNotAnswered.length > 0) {
      isValid = false;
      getErrorMessages(questionsNotAnswered).forEach((error) => {
        useEvents().dispatch("error", {
          severity: "error",
          summary: "Error: " + serie.name,
          detail: error,
          life: 5000,

        });
      });
    }
    validatedTestFirstTime.value = true;
    return isValid;
  };

  const validateTest = (test:TestAplication) => {
    //for each serie, this function returns the incorrect answers. This is for managing questions and series in toast
    useEvents().dispatch("clean-toast");
    let isValid = true;
    if (data.value.completed == 1) {
      data.value.series.forEach((serie: any) => {
        if (!validateSerie(serie, test)) isValid = false;
      });
    }
    if (isValid) sendTestConfirm();
  };

  const exitTest = (route: string) => {
    confirmExit.value = true;
    router.push(`/` + route);
  };
  const exitTestConfirm = (route: string) => {
    useEvents().dispatch("confirm", {
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
    useEvents().dispatch("confirm", {
      message: t("execute-test.dialogs.confirm-save-test.message"),
      header: t("execute-test.dialogs.confirm-save-test.title"),
      rejectLabel: t("global.cancel"),
      acceptLabel: t("global.confirm"),
      accept: () => {
        useEvents().dispatch('dialog-results')
        exitTest("");
      },
      reject: () => {
        confirmExit.value = false;
      },
    });
  };
  const questionsNotAnswered = {
    "2": [],
    "5": [],
  };

  const nextSerie = () => {
    if (data.value.navigable == 1) serieIndex.value += 1;
    else if (data.value.data?.completed == 1) {
      if (validateSerie(data.value.series[serieIndex.value], test))
        nextSerieConfirm();
    } else nextSerieConfirm();
  };
  const nextSerieConfirm = () => {
    useEvents().dispatch("confirm", {
      message: t("execute-test.dialogs.confirm-next-serie.message"),
      header: t("execute-test.dialogs.confirm-next-serie.title"),
      rejectLabel: t("global.cancel"),
      acceptLabel: t("global.confirm"),
      accept: () => {
        serieIndex.value += 1;
        setNewTime(
          data.value.series[serieIndex.value].time_serie_duration * 60000
        );
        validatedTestFirstTime.value = false;
      },
    });
  };

  const pushQuestionsNotAnswered = (questions: []) => {
    questions.forEach((question) => {

      switch (parseInt(question.question.type.id_type_question)) {
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

  const getErrorMessages = (questions: []) => {
    const errorMessages = [];
    pushQuestionsNotAnswered(questions);
    for (const key in questionsNotAnswered) {
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
  return {
    setData,
    data,
    setTest,
    test,
    sendTestConfirm,
    exitTestConfirm,
    exitTest,
    validateTest,
    validateSerie,
    confirmExit,
    validatedTestFirstTime,
    serieIndex,
    infoVisible,
    getErrorMessages,
    nextSerie
  };
};
