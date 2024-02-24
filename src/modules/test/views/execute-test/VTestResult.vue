<template>
  <VFinalResults :testResult="testResult" :testName="data.test.name"> 
    <button class="black-button" @click="resendTest()">
        Reenviar Test
      </button>
  </VFinalResults>
</template>
<script setup lang="ts">
import { inject, ref } from "vue";
import VFinalResults from "@/components/finalResults/VFinalResults.vue";
const dialogRef = inject("dialogRef");
const data = dialogRef.value.data;
let testResult = ref({ result: undefined, loading: true, error: false });
testResult.value = data.test.sendTest();
const resendTest = () => {
  testResult.value = data.test.sendTest();
};
</script>

