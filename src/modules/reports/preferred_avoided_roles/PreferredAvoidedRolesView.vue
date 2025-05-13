<template>

  <Card overflow-auto h-full>
    <template #content>
      <LoadingPanel v-if="isPending || isRefetching || isError" relative centered :loading="isPending || isRefetching"
        :error="isError" :refetch="async () => {
          await refetch();
          await refetchGroups()
        }" />
      <SelectGroup :refetch ref="select" v-model="selectedGroup" />

      {{ data }}
      <!-- <UserRelationsGraph ref="graph" v-else-if="isSuccess" :data="users">
        <template #header>
          <h1 text-xl font-semibold>Test en un grupo </h1>

          <TreeSelect @change="(value) => { defaultValue = value; refetch() }" :defaultValue
            :placeholder="$t('user.filtergroup')" :options="groups" filter w-40 v-model="selectedGroup" />
        </template>
</UserRelationsGraph> -->

    </template>

  </Card>

</template>
<script setup lang="ts">

import { provide, onUnmounted, ref, watchEffect } from "vue";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import { Card } from "primevue";
import { useGroups } from "@/modules/management/group/composables/useGroups";
import LoadingPanel from "@/components/LoadingPanel.vue";
import { usePreferredAvoidedRoles } from "./composables/usePreferredAvoidedRoles";
import { useUserGroup } from "@/common/utils/useUserGroup";
import SelectGroup from "@/components/SelectGroup.vue";
const { t } = useI18n();
const toast = useToast();
const dialog = useDialog();
provide("dialogRef", dialog);
const {  refetchGroups } = useGroups()
const selectedGroup = ref({ [useUserGroup()]: true })
const getSelectedGroup = () => Object.keys(selectedGroup.value)[0] ? Object.keys(selectedGroup.value)[0] : useUserGroup()

const graph = ref(null)

const { data, isPending, isSuccess, isRefetching, isError, refetch } = usePreferredAvoidedRoles(getSelectedGroup)
onUnmounted(() => {
  toast.removeAllGroups();
});

watchEffect(() => {
  if (isSuccess.value && !isPending.value && !isRefetching.value && graph.value) {
    //graph.value.generateGraph(users.value.data)
  }
})
</script>
