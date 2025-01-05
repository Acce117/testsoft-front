<template>
  <VFinalResults :loading="testResult.loading" :error="testResult.error" :testResult="testResult.result" :testName="data.test.name" :testType="data.test.type"> 
    <Button  @click="resendTest()" :label="t('global.resend')" icon="pi pi-refresh"/>
  </VFinalResults>
</template>
<script setup lang="ts">
import { inject, ref } from "vue";
import VFinalResults from "./finalResults/VFinalResults.vue";
import { useI18n } from "vue-i18n";
const dialogRef = inject("dialogRef");
const { t } = useI18n();
const data = dialogRef.value.data;
let testResult = ref({ result: {}, loading: true, error: false });
testResult.value = data.test.sendTest();
const resendTest = () => {
  testResult.value = data.test.sendTest();
};
</script>

