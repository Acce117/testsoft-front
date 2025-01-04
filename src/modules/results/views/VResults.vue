<template>
  <section mt-6rem pa-2>

    <CustomTable :title="t('results.title')" hideEdit hideDelete hideCreate :model="result"  :query-options="{
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
        <VFinalResults :testAppId="slotProps.dataOfOne.id_test_application" :testName="slotProps.dataOfOne.test.name" :testType="slotProps.dataOfOne.test.type_psi_test.id_type_test"/>  

      </template>
    </CustomTable>

  </section>

</template>
<script setup lang="ts">

import { userStore } from "@/modules/security/store/user-store";
import { ref, provide, onUnmounted } from "vue";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import CustomTable from "@/components/CustomTable.vue";
import { TestAplication } from "../models/testApp.model";
import VFinalResults from "./finalResults/VFinalResults.vue";
const { t } = useI18n();
const toast = useToast();
const dialog = useDialog();
provide("dialogRef", dialog);
//const { result, loading, error } = getResults(userStore().user_id);

const result = new TestAplication()

//const { results } = useResults()
const expandedRows = ref([]);
const expandAll = () => {
  expandedRows.value = result.value;
};
const collapseAll = () => {
  expandedRows.value = null;
};

// const getFinalResults = (
//   id: number | string,
//   name: string,
//   fk_id_type_test: number | string
// ) => {
//   dialog.open(VShowFinalResults, {
//     props: {
//       header: "Resultados",
//       modal: true,
//     },
//     templates: {},
//     data: {
//       id,
//       name,
//       fk_id_type_test,
//     },
//   });
// };

onUnmounted(() => {
  toast.removeAllGroups();
});
</script>
