<template>
  <section mt-6rem pa-2>
      <div rounded-xl pa-2 bg-white border-1 border-solid border-slate-200 shadow-md>

      
    <CustomTable title="results.my-results" :custom-get-one-function="(id_test_application:number)=>  TestResult.getOne(id_test_application)" hideEdit hideDelete hideCreate :model="result"  :query-options="{
      where: {
        fk_id_user: userStore().user_id
      },
      relations: [
        {
          name: 'test',
          relations:['type_psi_test']
        }
      ]
    }">

      <template #view-element="slotProps">
        <VFinalResults :loading="slotProps.isPendingOfOne" :error="slotProps.isErrorOfOne"  :testResult="slotProps.dataOfOne" :testName="slotProps.model.test.name" :testType="slotProps.model.test.type_psi_test.id_type_test"/>  
      </template>
    </CustomTable>
  </div>
  </section>

</template>
<script setup lang="ts">

import { userStore } from "@/modules/security/store/user-store";
import {  provide, onUnmounted } from "vue";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import CustomTable from "@/components/table/CustomTable.vue";
import { TestAplication } from "../models/testApp.model";
import VFinalResults from "./finalResults/VFinalResults.vue";
import { TestResult } from "../models/testResult.model";
const { t } = useI18n();
const toast = useToast();
const dialog = useDialog();
provide("dialogRef", dialog);

const result = new TestAplication()

onUnmounted(() => {
  toast.removeAllGroups();
});
</script>
