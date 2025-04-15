<template>
  <VFinalResults :loading="testResult.loading" :error="testResult.error" :refetch="resendTest"
    :testResult="testResult.result" :testName="data.test.name" :testType="data.test.type">
  </VFinalResults>
</template>
<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import VFinalResults from "./finalResults/VFinalResults.vue";
import { useI18n } from "vue-i18n";
import { useQueryClient } from "@tanstack/vue-query";
const dialogRef = inject("dialogRef");
const { t } = useI18n();
const data = dialogRef.value.data;
let testResult = ref({ result: {}, loading: true, error: false });

const resendTest = () => {
  testResult.value = data.test.sendTest(() => {
    useQueryClient().refetchQueries({
      queryKey: ['TestAplication']
    })
  });

};
onMounted(() => {
  resendTest()
})

</script>
