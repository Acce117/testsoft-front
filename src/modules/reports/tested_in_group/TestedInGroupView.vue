<template>

  <Card overflow-auto h-full>
    <template #content>
      <div flex flex-col w-full h-full>
        <div flex items-center gap-4>
          <h1 text-xl m-0 font-semibold>Personas Testeadas </h1>
          <SelectGroup :refetch ref="select" v-model="selectedGroup" />
        </div>

        <LoadingPanel v-if="isPending || isRefetching || isError" relative centered :loading="isPending || isRefetching"
          :error="isError" :refetch="async () => {
            await refetch();
            await refetchGroups()
          }" />

        <div class=" flex h-full w-full" v-else-if="isSuccess">

          <Chart type="bar" w-full h-full :data="chartData" :options="chartOptions" />
        </div>
      </div>




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
import { useTestedInGroup } from "./composables/useTestedForGroup";
import { useUserGroup } from "@/common/utils/useUserGroup";
import SelectGroup from "@/components/SelectGroup.vue";
import Chart from "primevue/chart";
const { t } = useI18n();
const toast = useToast();
const dialog = useDialog();
provide("dialogRef", dialog);
const { groups, refetchGroups } = useGroups()

const selectedGroup = ref({ [useUserGroup()]: true })
const getSelectedGroup = () => Object.keys(selectedGroup.value)[0] ? Object.keys(selectedGroup.value)[0] : useUserGroup()


const { data, isPending, isSuccess, isRefetching, isError, refetch } = useTestedInGroup(getSelectedGroup)
onUnmounted(() => {
  toast.removeAllGroups();
});

const chartData = ref({});
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,

    }
  }
});

watchEffect(() => {
  if (isSuccess.value && !isPending.value && !isRefetching.value) {
    chartData.value = {
      labels: Object.keys(data.value),
      datasets: [
        {
          label: 'Puntuaciones',
          data: Object.values(data.value),
          backgroundColor: [
            'rgb(66, 165, 245 ,0.3)', 'rgb(102, 187, 106,0.3)', 'rgb(255, 167, 38,0.3)', 'rgb(236, 64, 122,0.3)'
          ],
          borderColor: ['rgb(66, 165, 245)', 'rgb(102, 187, 106)', 'rgb(255, 167, 38)', 'rgb(236, 64, 122)'],
          borderWidth: 1
        }
      ]
    }
  }
})
</script>
