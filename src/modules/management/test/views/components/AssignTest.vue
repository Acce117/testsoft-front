<template>
  <Dialog v-model:visible="visible" modal :header="$t('table.update')" class="w-4/5 max-w-50rem min-w-25rem">

    <span>{{ $t('assign') }}</span>
    <Form @submit="mutate" :validation-schema="test.getUpdateSchema()">
      <div class="dialog-form">
        <div shadow-md v-for="group in data.groups" rounded-lg pa-2>
          {{group.name_group}}
        </div>
        
      </div>
      <div class="dialog-footer">
        <Button type="button" :label="$t('table.cancel')" severity="secondary" @click="visible = false"></Button>
        <VButton w-8rem :disabled="isUpdatePending || isGroupsLoading" type="submit">
          <span v-if="!isUpdatePending || isGroupsLoading">{{ $t("table.save") }} </span>
          <VLoading v-else />
        </VButton>
      </div>
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
import VButton from "@/components/VButton.vue";
const props = defineProps({ refetch: { type: Function, required: true } })
const toast = useToast();

const test: ModelRef<Test> = defineModel({ required: true })
const visible: ModelRef<boolean> = defineModel("visible")

// const {data:groups, isPending:isGroupsLoading} = useGroupsOfTest(test.value.id_test)
const { data, isPending: isGroupsLoading } =
  useQuery({
    queryKey: ["groups-of-test"],
    queryFn: async () =>
      await new Test({ id_test: test.value.id_test }).getOne({
        relations: ["groups"],
      }),
  });

const { t } = useI18n();
const { mutate, isPending: isUpdatePending } = useMutation({
  mutationKey: [`assign-test`],
  mutationFn: (data: object) => console.log(data),
  onSuccess: async () => {
    await props.refetch()
    toast.add({ severity: 'info', summary: t('table.confirmation'), detail: t('table.element_ok_updated'), life: 5000 });
    visible.value = false
    test.value.clearData()
  },
  onError: (error) => {
    toast.add({ severity: 'error', summary: t('table.something_wrong'), detail: error.statusCode == 404 ? t('table.relations_error') : t(error.message), life: 5000 });
  }
})
</script>
