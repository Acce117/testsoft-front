<template>

  <Card overflow-auto h-full>
    <template #content>
      <LoadingPanel v-if="isPending || isRefetching || isError" relative centered
            :loading="isPending || isRefetching" :error="isError" :refetch="async ()=>{
              await refetch();
              await refetchGroups()
            }" />
  
      <UserRelationsGraph ref="graph" v-else-if="isSuccess" :data="users">
        <template #header>
          <h1 text-xl font-semibold>Sociométrico </h1>
          <SelectGroup :refetch ref="select" v-model="selectedGroup"/>
           </template>
      </UserRelationsGraph>
     
    </template>

  </Card>

</template>
<script setup lang="ts">

import { provide, onUnmounted, ref, watchEffect } from "vue";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import UserRelationsGraph from "./components/UserRelationsGraph.vue";
import { useUsersFromGroupWithCompatibilityLeadership } from "@/modules/management/group/composables/useUsersFromGroupWithCompatibilityLeadership";
import { Card } from "primevue";
import { useGroups } from "@/modules/management/group/composables/useGroups";
import LoadingPanel from "@/components/LoadingPanel.vue";
import SelectGroup from "@/components/SelectGroup.vue";
import { useUserGroup } from "@/common/utils/useUserGroup";
const { t } = useI18n();
const toast = useToast();
const dialog = useDialog();
provide("dialogRef", dialog);

const {  refetchGroups } = useGroups()
const selectedGroup = ref({[useUserGroup()]:true})
const getSelectedGroup = () => Object.keys(selectedGroup.value)[0] ? Object.keys(selectedGroup.value)[0] : useUserGroup()
const { users, isPending, isSuccess, isRefetching,isError, refetch } = useUsersFromGroupWithCompatibilityLeadership(getSelectedGroup)


const graph = ref(null)
watchEffect(() => {
  if (isSuccess.value && !isPending.value && !isRefetching.value && graph.value) {
    graph.value.generateGraph(users.value.data)
  }
})

onUnmounted(() => {
  toast.removeAllGroups();
});
</script>
