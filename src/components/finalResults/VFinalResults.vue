<template>
  <div v-if="props.testResult?.error" class="error-sending">
    <VError><slot></slot></VError>
  </div>

  <div v-else style="width: 100%" class="modal__long-message">
    <div v-if="!props.testResult?.loading" class="test-results">
      <h1 class="results__test-title">Test: {{ props.testName }}</h1>
      <h2 v-if="props.testResult?.result.process.global_result == 1">
        Resultado Global: {{ getGlobalResult() }}
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
    <VLoading v-else style="height: 30rem" />
  </div>
</template>
<script setup lang="ts">
import VAllElementsTopValues from "./components/VAllElementsTopValues.vue";
import VAllElementsNoTopValues from "./components/VAllElementsNoTopValues.vue";
import VElementByCategoryTopValues from "./components/VElementByCategoryTopValues.vue";
import VElementByCategoryNoTopValues from "./components/VElementByCategoryNoTopValues.vue";

const props = defineProps({
  testResult: Object,
  testName: String,
  testType: String,
});
//TODO REVIEW OTHER PARAMETERS OF RESULTS VISUALIZATION

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
            result += ` y `;
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
