<template>
  <div class="error-sending" v-if="props.testResult?.error">
    <VError></VError>
  </div>

  <div v-else-if="!props.testResult?.loading" class="modal__long-message">
    <button
      black-button
      font-size-2rem
      gap-1rem
      absolute
      right-1rem
      class="p-ripple"
      v-ripple
      @click="confirmPDF"
    >
      <img src="/img/PDF.svg" w-3rem />
    </button>
    <div class="test-results" id="test-results" text-black>
      <h1 class="results__test-title">Test: {{ props.testName }}</h1>

      <h2 v-if="props.testResult?.result.process.global_result == 1">
        {{ $t("results.global-result") }}: {{ getGlobalResult() }}
      </h2>
      <VAllElementsTopValues
        v-if="
          props.testResult?.result.process.all_element_value == 1 &&
          props.testResult?.result.process.tops_values == 1
        "
        :testResult="props.testResult?.result"
      />
      <VAllElementsNoTopValues
        v-else-if="
          props.testResult?.result.process.all_element_value == 1 &&
          props.testResult?.result.process.tops_values == 0
        "
        :testResult="props.testResult?.result"
      />
      <VElementByCategoryTopValues
        v-else-if="
          props.testResult?.result.process.element_by_category == 1 &&
          props.testResult?.result.process.tops_values == 1
        "
        :testResult="props.testResult?.result"
      />
      <VElementByCategoryNoTopValues
        v-else-if="
          props.testResult?.result.process.element_by_category == 1 &&
          props.testResult?.result.process.tops_values == 0
        "
        :testResult="props.testResult?.result"
      />
    </div>
  </div>
  <VLoading v-else style="height: 30rem" />
</template>
<script setup lang="ts">
import VAllElementsTopValues from "./components/VAllElementsTopValues.vue";
import VAllElementsNoTopValues from "./components/VAllElementsNoTopValues.vue";
import VElementByCategoryTopValues from "./components/VElementByCategoryTopValues.vue";
import VElementByCategoryNoTopValues from "./components/VElementByCategoryNoTopValues.vue";
import { useI18n } from "vue-i18n";
import html2pdf from "html2pdf.js";
import useEvents from "@/common/utils/useEvents";
const { t } = useI18n();

const props = defineProps({
  testResult: Object,
  testName: String,
  testType: String,
});
//TODO REVIEW OTHER PARAMETERS OF RESULTS VISUALIZATION
const exportToPDF = () => {
  html2pdf(document.getElementById("test-results"), {
    margin: 3,
    filename: "Results of " + props.testName + ".pdf",
  })
    .then(
      useEvents().dispatch("error", {
        severity: "info",
        summary: t("global.info"),
        life: 3000,
        detail: t("global.export.correct"),
      })
    )
    .catch(e=>{
      useEvents().dispatch("error", {
        severity: "error",
        summary: t("global.error"),
        life: 3000,
        detail: t("global.export.error"),
      })}
    );
};

const confirmPDF = (event: any) => {
  useEvents().dispatch("confirm", {
    target: event.target,
    group: "popup",
    message: t("global.export.message"),
    rejectLabel: t("global.cancel"),
    acceptLabel: t("global.export.title"),
    accept: () => {
      exportToPDF();
    },
  });
};

const getGlobalResult = () => {
  let result = "";
  if (props.testType == "2") {
    Object.keys(props.testResult?.result.categories).forEach(
      (category: any, index: number) => {
        if (index > 0) {
          if (
            index ==
            Object.keys(props.testResult?.result.categories).length - 1
          )
            result += ` ` + t("global.and") + ` `;
          else result += ", ";
        }
        result += props.testResult?.result.categories[category].items.name;
      }
    );
  } else {
    //TODO REVIEW GLOBAL RESULT PARAMETERS
  }

  return result;
};
</script>
<style>
.error-sending {
  width: 100%;
  height: 30rem;
  filter: invert();
}
.results__test-title {
  text-align: left;
}
.error-sending button {
  font-size: 1.5rem;
}
strong {
  font-weight: bold;
}
.test-results {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
@media (min-width: 768px) {
  .error-sending button {
    font-size: 2rem;
  }
}
</style>
