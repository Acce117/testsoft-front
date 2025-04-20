import useEvents from "@/common/utils/useEvents";
import router from "@/router";
import { ref } from "vue";
import type { Question } from "../../../classes/question-class";
import type { TestExecution } from "@/modules/test/classes/testExecution";
import { useLocalI18n } from "@/common/utils/useLocalI18n";

export const useExecuteTest = () => {
  const confirmExit = ref(false);
  const validatedTestFirstTime = ref(false);
  const infoVisible = ref(false);
  const secondOpportunityMinutes = 1;

  const serieIndex = ref(0);
  let data: {
    completed: number;
    series: any[];
    time_duration: number;
    navigable: number;
    data: { completed: number };
    value: { series: any[] };
  };
  const timeCountdown = ref(10000);

  const setData = (d: any) => {
    data = d;
    //validateTestDuration()
    let serieTime: number =
      d.time_duration > 0
        ? d.time_duration
        : d.series[serieIndex.value].time_serie_duration;
    let testTime = 0;

    let serie = JSON.parse(sessionStorage.getItem("serie_index"));
    if (serie) {
      serieIndex.value = parseInt(serie);
    } else {
      sessionStorage.setItem("serie_index", JSON.stringify(serieIndex.value));
    }

    let testInitTime = getInitTestTimeInLocal();

    if (testInitTime) {
      if (getSecondOpportunity() == 0) {
        serieTime = secondOpportunityMinutes; // Time of second opportunity
        useEvents().dispatch("error", {
          severity: "warn",
          summary: t("warning") + ":",

          detail: t("test-ended-first-time"),
          life: 5000,
        });
      }

      testTime =
        serieTime * 60001 -
        (new Date().getTime() - new Date(testInitTime).getTime());
    } else {
      sessionStorage.setItem("init_test_time", JSON.stringify(new Date()));
      testTime = serieTime * 60001;
    }
    timeCountdown.value = testTime;
  };

  const setSecondOpportunity = (value: boolean) => {
    sessionStorage.setItem("second_opportunity", value ? "1" : "0");
  };
  const getSecondOpportunity = () => {
    return JSON.parse(sessionStorage.getItem("second_opportunity"));
  };

  if (getSecondOpportunity() == null) {
    setSecondOpportunity(true);
  }

  const validateSerie = (serie: any, test: TestExecution) => {
    let isValid = true;
    const questionsNotAnswered = test.getQuestionsNotAnswered(serie.questions);
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

  const validateTest = (test: TestExecution) => {
    //for each serie, this function returns the incorrect answers. This is for managing questions and series in toast
    useEvents().dispatch("clean-toast");
    let isValid = true;
    if (data.completed == 1) {
      data.series.forEach((serie: any) => {
        if (!validateSerie(serie, test)) isValid = false;
      });
    }
    if (isValid) sendTestConfirm();
  };

  const validateTestDuration = () => {
    const testInitTime = getInitTestTimeInLocal();

    let maxTestTime = 0;
    if (testInitTime) {
      if (data.time_duration > 0) {
        maxTestTime += secondOpportunityMinutes;
        maxTestTime += data.time_duration;
        maxTestTime = maxTestTime * 60001;
        console.log(maxTestTime);
        console.log(new Date().getTime() - new Date(testInitTime).getTime());
        if (
          maxTestTime -
            (new Date().getTime() - new Date(testInitTime).getTime()) <=
          0
        ) {
          setSecondOpportunity(false);
          timeOver();
        }
      }
    }
  };

  const exitTest = (route: string) => {
    confirmExit.value = true;
    cleanTestExecution();
    router.push(`/` + route);
  };
  const exitTestConfirm = (route: string) => {
    const t = useLocalI18n(localMessages);
    useEvents().dispatch("confirm", {
      message: t("confirm-exit-test.message"),
      header: t("confirm-exit-test.title"),
      rejectLabel: t("cancel"),
      acceptLabel: t("confirm"),
      accept: () => {
        exitTest(route);
      },
    });
  };

  const sendTestConfirm = () => {
    const t = useLocalI18n(localMessages);
    useEvents().dispatch("confirm", {
      message: t("confirm-save-test.message"),
      header: t("confirm-save-test.title"),
      rejectLabel: t("cancel"),
      acceptLabel: t("confirm"),
      accept: () => {
        useEvents().dispatch("dialog-results");
        exitTest("my-results");
      },
      reject: () => {
        confirmExit.value = false;
      },
    });
  };

  const setNewTime = (time: number) => {
    timeCountdown.value = time + 1;
    setTimeout(() => {
      timeCountdown.value = time;
    }, 0);
  };

  const cleanTestExecution = () => {
    data = undefined;
    changeSerie(0);
    deleteTestExecutionInLocal();
    sessionStorage.removeItem("init_test_time");
    sessionStorage.removeItem("serie_index");
    sessionStorage.removeItem("second_opportunity");
  };

  const getInitTestTimeInLocal = () => {
    return JSON.parse(sessionStorage.getItem("init_test_time"));
  };

  const setActualTimeInLocal = () => {
    sessionStorage.setItem("init_test_time", JSON.stringify(new Date()));
  };

  const timeOver = () => {
    const t = useLocalI18n(localMessages);
    try {
      if (data.time_duration > 0) {
        if (getSecondOpportunity() == 1) {
          setNewTime(secondOpportunityMinutes * 60000);
          setActualTimeInLocal();
          setSecondOpportunity(false);
          useEvents().dispatch("error", {
            severity: "warn",
            summary: t("warning") + ":",

            detail: t("test-ended-first-time"),
            life: 5000,
          });
        } else throw new Error("Time Over");
      } else {
        if (serieIndex.value < data.series.length - 1) {
          changeSerie(serieIndex.value + 1);
          setNewTime(data.series[serieIndex.value].time_serie_duration * 60000);
          setActualTimeInLocal();
          useEvents().dispatch("clean-toast");
          useEvents().dispatch("error", {
            severity: "warn",
            summary: t("warning") + ":",
            detail: t("serie-ended"),
            life: 5000,
          });
        } else throw new Error("Time Over");
      }
    } catch (e: any) {
      if (e.message === "Time Over") {
        confirmExit.value = true;
        router.push("/select-test");
        cleanTestExecution();
        useEvents().dispatch("info", {
          message: t("test-ended"),
        });
      } else console.error(e);
    }
  };

  const questionsNotAnswered = {
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
    "6": [],
  };

  const changeSerie = (value: number) => {
    serieIndex.value = value;
    sessionStorage.setItem("serie_index", JSON.stringify(value));
  };

  const nextSerie = (test: TestExecution) => {
    if (data.navigable == 1) changeSerie(serieIndex.value + 1);
    else if (data.data?.completed == 1) {
      if (validateSerie(data.value.series[serieIndex.value], test))
        nextSerieConfirm();
    } else nextSerieConfirm();
  };

  const nextSerieConfirm = () => {
    const t = useLocalI18n(localMessages);
    useEvents().dispatch("confirm", {
      message: t("confirm-next-serie.message"),
      header: t("confirm-next-serie.title"),
      rejectLabel: t("cancel"),
      acceptLabel: t("confirm"),
      accept: () => {
        changeSerie(serieIndex.value + 1);
        setNewTime(data.series[serieIndex.value].time_serie_duration * 60000);
        setActualTimeInLocal();
        validatedTestFirstTime.value = false;
      },
    });
  };

  const pushQuestionsNotAnswered = (questions: []) => {
    questions.forEach((question) =>
      questionsNotAnswered[question.question.type.id_type_question + ""].push(
        question
      )
    );
  };

  const getErrorMessages = (questions: []) => {
    const t = useLocalI18n(localMessages);
    const errorMessages = [];
    pushQuestionsNotAnswered(questions);
    for (const key in questionsNotAnswered) {
      if (questionsNotAnswered[key].length > 0) {
        let error = t(`error.${key}`) + " ";
        if (questionsNotAnswered[key].length == 1)
          error += `${t("error.in-question")} `;
        else error += `${t("error.in-question")}s `;
        questionsNotAnswered[key].forEach((question: any, index: number) => {
          if (index > 0) {
            if (index == questionsNotAnswered[key].length - 1)
              error += ` ${t("and")} `;
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

  const isAnswerInvalidInQuestion = (
    question: Question,
    changeInvalid: Function
  ) => {
    const invalid = validatedTestFirstTime.value
      ? !question || !question.validateQuestion()
      : false;
    changeInvalid(invalid);
    return invalid;
  };

  const saveTestExecutionInLocal = (questions: Array<Question<unknown>>) => {
    sessionStorage.setItem("test_execution", JSON.stringify(questions));
  };
  const deleteTestExecutionInLocal = () => {
    sessionStorage.removeItem("test_execution");
  };
  const getTestExecutionInLocal = () => {
    const testExecution = sessionStorage.getItem("test_execution");
    let questions = {};
    if (testExecution) {
      questions = JSON.parse(testExecution);
    }
    return questions;
  };
  return {
    setData,
    exitTestConfirm,
    validateTest,
    confirmExit,
    validatedTestFirstTime,
    serieIndex,
    changeSerie,
    infoVisible,
    nextSerie,
    timeOver,
    timeCountdown,
    isAnswerInvalidInQuestion,
    saveTestExecutionInLocal,
    getTestExecutionInLocal,
  };
};

const localMessages = {
  es: {
    "and":"y",
    "cancel":"Cancelar",
    "confirm": "Aceptar",
    "warning": "Advertencia",

    "serie-ended":
      "El tiempo de la serie ha terminado. Se ha avanzado a la próxima serie.",
    "test-ended-first-time":
      "El tiempo del test ha terminado. Se agregarán 5 minutos más.",
    "test-ended": "El tiempo del test ha terminado",
    "confirm-next-serie": {
      title: "Serie",
      message:
        "¿Desea avanzar a la siguiente serie? No podrá regresar a la anterior...",
    },
    "confirm-save-test": {
      title: "Salir",
      message: "¿Desea guardar las respuestas del test?",
    },
    "confirm-exit-test": {
      title: "Salir",
      message: "¿Desea salir del test? Las respuestas se perderán.",
    },

    error: {
      "1": "Debe seleccionar una respuesta",
      "2": "Debe seleccionar una respuesta",
      "3": "Debe escribir una respuesta",
      "4": "Debe seleccionar una respuesta",
      "5": "Existen puntos por asignar aún",
      "6": "Debe escribir una respuesta",
      "in-question": "en la pregunta",
    },
  },
  en: {
    "and":"and",
    "cancel":"Cancel",
    "confirm": "Confirm",
    "warning": "Warning",
    "serie-ended":
      "The time for the series has ended. You have been advanced to the next series.",
    "test-ended-first-time":
      "The time for the test has ended. An additional 5 minutes will be added.",
    "test-ended": "The time for the test has ended",
    "confirm-next-serie": {
      title: "Series",
      message:
        "Do you want to proceed to the next series? You won't be able to return to the previous one...",
    },
    "confirm-save-test": {
      title: "Exit",
      message: "Do you want to save the test answers?",
    },
    "confirm-exit-test": {
      title: "Exit",
      message: "Do you want to cancel the test? The answers will be lost.",
    },

    
    error: {
      "1": "You must select an answer",
      "2": "You must select an answer",
      "3": "You must write an answer",
      "4": "You must select an answer",
      "5": "There are points to be assigned yet",
      "6": "You must write an answer",
      "in-question": "in question",
    },
  },
};
