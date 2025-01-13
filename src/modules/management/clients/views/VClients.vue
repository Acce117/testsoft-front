<template>

  <CustomTable :title="t('clients')" hideEdit hideDelete hideCreate :model="client" :query-options="{
    depth:0,
    relations: [
      
        'owner'
      
    ]
  }">


  </CustomTable>


</template>
<script setup lang="ts">

import { provide, onUnmounted } from "vue";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import CustomTable from "@/components/CustomTable.vue";
import { Group } from "../../group/models/group.model";
const { t } = useI18n();
const toast = useToast();
const dialog = useDialog();
provide("dialogRef", dialog);

const client = new Group()

onUnmounted(() => {
  toast.removeAllGroups();
});
</script>
