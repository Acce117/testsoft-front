<template>
  <div v-if="props.testResult?.error" class="error-sending">
    <VError><slot></slot></VError>
  </div>

  <div v-else style="width: 100%" class="modal__long-message">
    <div v-if="!props.testResult?.loading" class="test-results">
      <h1 class="results__test-title">Test: {{ props.testName }}</h1>
      <VOnlyTopResults
        v-if="props.testResult?.result.process.tops_values== 1"
        :testResult="props.testResult?.result"
      />
      <VAllResults v-else :testResult="props.testResult?.result" />
    </div>
    <VLoading v-else style="height: 30rem" />
  </div>
</template>
<script setup lang="ts">
import VOnlyTopResults from "./VOnlyTopResults.vue";
import VAllResults from "./VAllResults.vue";
const props = defineProps({
  testResult: Object,
  testName: String,
});
//TODO REVIEW OTHER PARAMETERS OF RESULTS VISUALIZATION
console.log(props.testResult)
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
