<template>
  <Dialog v-model:visible="visible" modal :header="$t('table.assign')" class="w-4/5 max-w-50rem min-w-25rem">

    <span>{{ $t('table.assign') }} {{ test.name }}</span>
    <Form @submit="mutate" :validation-schema="test.getUpdateSchema()">
      <div class="dialog-form">
        <div rounded-xl p-2 bg-slate-200>

          <Tree v-if="!isRequestLoading && !isGroupsLoading" rounded-xl :value="groups">
            <template #default="slotProps">
              <b mr-4>{{ slotProps.node.label }}</b> <Button @click="retireTest(slotProps.node.key)"
                v-if="slotProps.node.psiTests.filter(t => t.id_test == test.id_test)[0]" severity="danger"
                :label="$t('table.retire')"></Button> <Button v-else @click="assignTest(slotProps.node.key)"
                :label="$t('table.assign')"></Button>
            </template>
          </Tree>
        </div>

      </div>
      <!-- <div class="dialog-footer">
        <Button type="button" :label="$t('global.cancel')" severity="secondary" @click="visible = false"></Button>
        <VButton w-8rem :disabled="isUpdatePending || isGroupsLoading" type="submit">
          <span v-if="!isUpdatePending || isGroupsLoading">{{ $t("global.save") }} </span>
          <VLoading v-else />
        </VButton>
      </div> -->
    </Form>
  </Dialog>
</template>
<script setup lang="ts">
import "vue3-treeselect/dist/vue3-treeselect.css";
import { useI18n } from "vue-i18n";
import { Test } from "../../models/test.model";
import type { ModelRef } from "vue";
import { Form } from "vee-validate";
import Dialog from "primevue/dialog";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import { useGroupsWithTest } from "@/modules/management/group/composables/useGroups";
import Tree from "primevue/tree";
import { GroupForTest } from "../../modules/group_for_test/group_for_test.model";
import handlePromise from "@/common/utils/handlePromise";
import { ref } from "vue";
const props = defineProps({ refetch: { type: Function, required: true } })

const isRequestLoading = ref(false)
const assignTest = (id_group: string) => {
  handlePromise(() => new GroupForTest().create({ id_test: test.value.id_test, id_group: id_group }), isRequestLoading, () => {
    refetchGroups()
  })
}
const retireTest = async (id_group: string) => {
  handlePromise(async () => {
    const groupForTest = new GroupForTest()
    const assignations = await groupForTest.getAll({
      where: {
        fk_id_test: test.value.id_test,
        fk_id_group: id_group
      }
    })
    groupForTest.delete(assignations[0].id_group_for_test)
  }, isRequestLoading, () => {
    refetchGroups()
  })
}

const test: ModelRef<Test> = defineModel({ required: true })
const visible: ModelRef<boolean> = defineModel("visible")

const { groups, refetch: refetchGroups, isPending: isGroupsLoading } = useGroupsWithTest()

</script>
