<template>
  <section mt-6rem pa-2>

    <CustomTable title="my-results.title" :custom-get-one-function="(id_test_application:number)=>new TestResult({id_test_application:id_test_application}).getOne()" hideEdit hideDelete hideCreate :model="result"  :query-options="{
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

  </section>

</template>
<script setup lang="ts">

import { userStore } from "@/modules/security/store/user-store";
import {  provide, onUnmounted } from "vue";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import CustomTable from "@/components/CustomTable.vue";
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
