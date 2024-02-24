<template>
  <div v-if="props.testResult.error" class="error-sending">
    <VError><slot></slot></VError>
  </div>

  <div v-else style="width: 100%" class="modal__long-message">
    <div v-if="!props.testResult.loading" class="test-results">
      <h1 class="results__test-title">Test: {{ props.testName }}</h1>
      <VCategoriesResults
        v-if="props.testResult.result.process.element_by_category == 1"
        :testResult="props.testResult"
      />
      <VPreferredAvoidedResults v-else :testResult="props.testResult" />
    </div>
    <VLoading v-else style="height: 30rem" />
  </div>
</template>
<script setup lang="ts">
import VPreferredAvoidedResults from "./VPreferredAvoidedResults.vue";
import VCategoriesResults from "./VCategoriesResults.vue";
const props = defineProps({
  testResult: Object,
  testName: String,
});
//TODO REVIEW OTHER PARAMETERS OF RESULTS VISUALIZATION
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
