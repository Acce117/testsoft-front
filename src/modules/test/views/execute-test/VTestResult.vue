<template>
  <VFinalResults :testResult="testResult" :testName="data.test.name" :testType="data.test.type"> 
    <button black-button @click="resendTest()">
        {{ $t('global.resend') }}
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

