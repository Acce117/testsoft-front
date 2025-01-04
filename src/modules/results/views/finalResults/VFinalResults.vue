<template>

  <div class="error-sending" v-if="isError">
    <VError></VError>
  </div>
  <div v-else-if="!isPending" class="modal__long-message">

    <div class="test-results" text-slate-600  id="test-results" text-black>
      <div flex gap-4 > 
        <h1 font-bold text-slate-800 text-left font-size-1.5rem my-0 >Test: {{ props.testName }}</h1><Button icon="pi pi-file-pdf" @click="confirmPDF"
          label="Exportar"></Button>
      </div>

      <h2 v-if="testResult.parameters.global_result == 1 && testType == 2">
        {{ $t("results.global-result") }}:
        <span v-for="(category, index) in Object.keys(testResult.categories) " :key="category">
          {{ `${index > 0 ? (index == Object.keys(testResult.categories).length - 1 ? ` ` + t("global.and") + ` ` : ",")
            : ''}${testResult.categories[category].items[0].name}` }}
        </span>
      </h2>
      <VAllElementsTopValues v-if="
        testResult.parameters.all_element_value == 1 &&
        testResult.parameters.tops_values == 1
      " :testResult />
      <VAllElementsNoTopValues v-else-if="
        testResult.parameters.all_element_value == 1 &&
        testResult.parameters.tops_values == 0
      " :testResult />
      <VElementByCategoryTopValues v-else-if="
        testResult.parameters.element_by_category == 1 &&
        testResult.parameters.tops_values == 1
      " :testResult />
      <VElementByCategoryNoTopValues v-else-if="
        testResult.parameters.element_by_category == 1 &&
        testResult.parameters.tops_values == 0
      " :testResult />
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
import { useResults } from "@/modules/results/composables/useResults";
import { computed } from "vue";
import Button from "primevue/button";
const { t } = useI18n();

const props = defineProps({
  testAppId: { type: Number, required: true },
  testResult: Object,
  testName: String,
  testType: Number,
});

const { testResult, isPending, isError } = useResults(props.testAppId)



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
    .catch(e => {
      useEvents().dispatch("error", {
        severity: "error",
        summary: t("global.error"),
        life: 3000,
        detail: t("global.export.error"),
      })
    }
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

const getGlobalResult = computed(() => {
  let result = "";
  if (props.testType == 2) {
    console.log(testResult)
    if (
      testResult.categories
    ) {

      const categories = Object.keys(testResult.categories)
      if (categories.length > 0)

        categories.forEach(
          (category: any, index: number) => {
            if (index > 0) {
              if (
                index == categories.length
                - 1
              )
                result += ` ` + t("global.and") + ` `;
              else result += ", ";
            }
            result += testResult.categories[category].items[0].name;
          }
        );
    }
  } else {
    //TODO REVIEW GLOBAL RESULT PARAMETERS
  }

  return result;
});
</script>
<style>
strong {
  color: var(--p-button-primary-background)
}

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
  gap: .5rem;
}

@media (min-width: 768px) {
  .error-sending button {
    font-size: 2rem;
  }
}
</style>
