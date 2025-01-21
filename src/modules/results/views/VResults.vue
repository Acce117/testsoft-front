<template>

  <CustomTable hasExpander ref="table" title="Resultados por Usuario" hideActions :model="user" :custom-get-all-function="getUsersByGroup">
    <template #header>
      <div w-full>
        <TreeSelect @change="() => table.refetch()" :placeholder="$t('filtergroup')" :options="groups" filter w-40
          v-model="selectedGroup" />
      </div>
    </template>


    <template #expansion="slotProps">
      <CustomTable :title="t('results.title')"  
        :custom-get-one-function="(id_test_application: number) => new TestResult({ id_test_application: id_test_application }).getOne()"
        hideEdit hideDelete hideCreate :model="result" :query-options="{

          relations: [
            {
              name: 'test',
              relations: ['type_psi_test']
            }
          ],
          where:{
            fk_id_user:slotProps.slotProps.data.user_id
          }
        }">

        <template #view-element="slotProps">
          <VFinalResults :loading="slotProps.isPendingOfOne" :error="slotProps.isErrorOfOne"
            :testResult="slotProps.dataOfOne" :testName="slotProps.model.test.name"
            :testType="slotProps.model.test.type_psi_test.id_type_test" />
        </template>

      </CustomTable>
    </template>

  </CustomTable>


</template>
<script setup lang="ts">

import { userStore } from "@/modules/security/store/user-store";
import { provide, onUnmounted, ref } from "vue";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import CustomTable from "@/components/CustomTable.vue";
import { TestAplication } from "../models/testApp.model";
import VFinalResults from "./finalResults/VFinalResults.vue";
import { TestResult } from "../models/testResult.model";
import { Group } from "@/modules/management/group/models/group.model";
import TreeSelect from "primevue/treeselect";
import { User } from "@/modules/management/users/models/user.model";
import { useGroups } from "@/modules/management/group/composables/useGroups";
const { t } = useI18n();
const toast = useToast();
const table = ref()
const dialog = useDialog();
provide("dialogRef", dialog);

const result = new TestAplication()
const selectedGroup = ref({})
let user = ref(new User())
const { groups } = useGroups()


const getUsersByGroup = async () => {
  const id_group = Object.keys(selectedGroup.value)[0]
  const group = await new Group({ id_group: id_group ? id_group : userStore().assignments[0].group_id }).getOne({ relations: ['users'] })
  return group.users
}
const getResultsByUser = async ()=>{

}
onUnmounted(() => {
  toast.removeAllGroups();
});
</script>
