<template>

  <Card overflow-auto h-full>
    <template #content>
      <LoadingPanel v-if="isPending || isRefetching || isError" relative centered
            :loading="isPending || isRefetching" :error="isError" :refetch="async ()=>{
              await refetch();
              await refetchGroups()
            }" />

      <!-- <UserRelationsGraph ref="graph" v-else-if="isSuccess" :data="users">
        <template #header>
          <h1 text-xl font-semibold>Sociométrico </h1>

          <TreeSelect @change="(value) => { defaultValue = value; refetch() }" :defaultValue
            :placeholder="$t('user.filtergroup')" :options="groups" filter w-40 v-model="selectedGroup" />
        </template>
      </UserRelationsGraph> -->
      <EvyGraph>

      </EvyGraph>
    </template>

  </Card>

</template>
<script setup lang="ts">

import { userStore } from "@/modules/security/store/user-store";
import { provide, onUnmounted, ref, watchEffect } from "vue";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import UserRelationsGraph from "./components/UserRelationsGraph.vue";
import { useUsersFromGroupWithCompatibilityLeadership } from "@/modules/management/group/composables/useUsersFromGroupWithCompatibilityLeadership";
import { Card, TreeSelect } from "primevue";
import { useGroups } from "@/modules/management/group/composables/useGroups";
import LoadingPanel from "@/components/LoadingPanel.vue";
import EvyGraph from "./components/EvyGraph.vue";
const { t } = useI18n();
const toast = useToast();
const dialog = useDialog();
provide("dialogRef", dialog);
const { groups, refetchGroups } = useGroups()
let defaultValue = {}
defaultValue[userStore().assignments[0].group_id] = true
const selectedGroup = ref({})
selectedGroup.value[userStore().assignments[0].group_id] = true


const getSelectedGroup = () => Object.keys(selectedGroup.value)[0] ? Object.keys(selectedGroup.value)[0] : userStore().assignments[0].group_id
const graph = ref(null)

const { users, isPending, isSuccess, isRefetching,isError, refetch } = useUsersFromGroupWithCompatibilityLeadership(getSelectedGroup)
onUnmounted(() => {
  toast.removeAllGroups();
});

watchEffect(() => {
  if (isSuccess.value && !isPending.value && !isRefetching.value && graph.value) {
    console.log(graph.value)
    graph.value.generateGraph(users.value.data)
  }
})
</script>
