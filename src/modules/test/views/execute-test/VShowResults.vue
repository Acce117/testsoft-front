<template>
  <div v-if="testResult.error" class="error-sending">
    <VError
      ><button class="black-button" @click="resendTest()">
        Reenviar Test
      </button></VError
    >
  </div>

  <div v-else style="width: 100%" class="modal__long-message">
    <div v-if="!testResult.loading" class="test-results">
      <h1 class="results__test-title">Test: {{ data.test.name }}</h1>
      <VCategoriesResults
        v-if="testResult.result.process.element_by_category == 1"
        :testResult="testResult"
      />
      <VPreferredAvoidedResults v-else :testResult="testResult" />
    </div>
    <VLoading v-else style="height: 30rem" />
  </div>
</template>
<script setup lang="ts">
import { inject, ref } from "vue";
import VPreferredAvoidedResults from "@/components/results/VPreferredAvoidedResults.vue";
import VCategoriesResults from "@/components/results/VCategoriesResults.vue";
const dialogRef = inject("dialogRef");
const data = dialogRef.value.data;
let testResult = ref({ result: undefined, loading: true, error: false });
testResult.value = data.test.sendTest();
const resendTest = () => {
  testResult.value = data.test.sendTest();
};
//TODO REVIEW OTHER PARAMETERS OF RESULTS VISUALIZATION
</script>
<style>
.error-sending {
  width: 100%;
  height: 30rem;
}
.results__test-title{
  text-align: left;
}
.error-sending button {
  font-size: 1.5rem;
}
strong {
  font-weight: bold;
}
.test-results{
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
