<template>

  <TableServerPagination hasExpander hide-create ref="table" :title="t('by_user')" :visible-actions="false"
    :model="user" :custom-get-all-function="getUsersByGroup">
    <template #header>
      <div w-full>
        <SelectGroup :refetch="()=>table.refetch()" ref="select" v-model="selectedGroup"/>
      </div>
    </template>


    <template #expansion="slotProps">
      <TableServerPagination :title="t('title')" intern-datatable
        :custom-get-one-function="(id_test_application: number) => TestResult.getOne(id_test_application)"
        :visibleUpdateButton="false" :visibleDeleteButton="false" :visibleCreateButton="false" :model="result"
        :query-options="{

          relations: [
            {
              name: 'test',
              relations: ['type_psi_test']
            }
          ],
          where: {
            fk_id_user: slotProps.slotProps.data.user_id
          }
        }">

        <template #view-element="slotProps">
          {{ slotProps.dataOfOne }}
          <VFinalResults :loading="slotProps.isPendingOfOne" :error="slotProps.isErrorOfOne"
            :testResult="slotProps.dataOfOne" :testName="slotProps.model.test.name"
            :testType="slotProps.model.test.type_psi_test.id_type_test" />
        </template>

      </TableServerPagination>
    </template>

  </TableServerPagination>


</template>
<script setup lang="ts">

import { provide, onUnmounted, ref } from "vue";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import { TestAplication } from "../models/testApp.model";
import VFinalResults from "./finalResults/VFinalResults.vue";
import { TestResult } from "../models/testResult.model";
import { User } from "@/modules/management/users/models/user.model";
import TableServerPagination from "@/components/table/TableServerPagination.vue";
import SelectGroup from "@/components/SelectGroup.vue";
import { useUserGroup } from "@/common/utils/useUserGroup";
const { t } = useI18n();
const toast = useToast();
const table = ref()
const dialog = useDialog();
provide("dialogRef", dialog);

const result = new TestAplication()
let user = ref(new User())
const selectedGroup = ref({[useUserGroup()]:true})



const getUsersByGroup = async () => {
  const id_group = Object.keys(selectedGroup.value)[0]
  return await user.value.getUsersByGroup({}, id_group ? id_group : useUserGroup())
}

onUnmounted(() => {
  toast.removeAllGroups();
});
</script>

<i18n lang="json">{
  "es": {
    "title": "Resultados",
    "my-results": "Mis Resultados",
    "by_user": "Resultados por Usuario",
    "results-of": "Resultados de",
    "date": "Fecha",
    "test": "Test",
    "name": "Nombre",
    "value": "Valor",
    "global-result": "Resultado Global"
  },
  "en": {
    "title": "Results",
    "my-results": "My Results",
    "by_user": "Results by User",
    "results-of": "Results of",
    "date": "Date",
    "test": "Test",
    "name": "Name",
    "value": "Value",
    "global-result": "Global Result"
  }
}</i18n>
