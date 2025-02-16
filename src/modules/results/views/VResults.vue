<template>

  <CustomTable hasExpander hide-create ref="table" title="results.by_user" hideActions :model="user"
    :custom-get-all-function="getUsersByGroup">
    <template #header>
      <div w-full>
        <TreeSelect @change="() => table.refetch()" :defaultValue :placeholder="$t('user.filtergroup')"
          :options="groups" filter w-40 v-model="selectedGroup" />
      </div>
    </template>


    <template #expansion="slotProps">
      <CustomTable title="results.title"
        :custom-get-one-function="(id_test_application: number) => TestResult.getOne(id_test_application)" hideEdit
        hideDelete hideCreate :model="result" :query-options="{

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

  const group = await Group.getOne(id_group ? id_group : userStore().assignments[0].group_id, { relations: ['users'] })
  return group.users
}
let defaultValue = {}
defaultValue[userStore().assignments[0].group_id] = true
onUnmounted(() => {
  toast.removeAllGroups();
});
</script>
