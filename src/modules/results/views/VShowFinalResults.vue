<template>
  <VFinalResults :testResult="testResult" :testName="data.name" :testType="data.fk_id_type_test"/> 
</template>
<script setup lang="ts">
import { inject, ref } from "vue";
import VFinalResults from "@/components/finalResults/VFinalResults.vue";
import { getFinalResults } from "./../results.ts";
const dialogRef = inject("dialogRef");
const data = dialogRef.value.data;
let testResult = ref({ result: undefined, loading: true, error: false });
testResult.value = getFinalResults(data.id) ;
</script>

