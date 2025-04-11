<template>



  <TableServerPagination title="results.my-results"
    :custom-get-one-function="(id_test_application: number) => TestResult.getOne(id_test_application)"
    :visibleUpdateButton="false" :visibleDeleteButton="false" :visibleCreateButton="false" :model="result"
    :query-options="{
      where: {
        fk_id_user: userStore().user_id
      },
      relations: [
        {
          name: 'test',
          relations: ['type_psi_test']
        }
      ]
    }">

    <template #view-element="slotProps">
      <VFinalResults :loading="slotProps.isPendingOfOne" :error="slotProps.isErrorOfOne"
        :testResult="slotProps.dataOfOne" :testName="slotProps.model.test.name"
        :testType="slotProps.model.test.type_psi_test.id_type_test" />
    </template>
  </TableServerPagination>

</template>
<script setup lang="ts">

import { userStore } from "@/modules/security/store/user-store";
import { provide, onUnmounted } from "vue";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import { TestAplication } from "../models/testApp.model";
import VFinalResults from "./finalResults/VFinalResults.vue";
import { TestResult } from "../models/testResult.model";
import TableServerPagination from "@/components/table/TableServerPagination.vue";
const { t } = useI18n();
const toast = useToast();
const dialog = useDialog();
provide("dialogRef", dialog);

const result = new TestAplication()

onUnmounted(() => {
  toast.removeAllGroups();
});
</script>
