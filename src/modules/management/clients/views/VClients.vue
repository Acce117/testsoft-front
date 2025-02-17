<template>

  <CustomTable ref="table" :title="t('clients.title')" hideShow hideEdit hideDelete hideCreate :model="client" :query-options="{
    
  }"
  :extra-options="[ 
  {
    renderIf: (value:User) => value.enabled == true ,
    icon: 'pi pi-trash',
    tooltip: 'table.desactivate',
    action: (value, event) => table.desactivateElement(value, event)
  },
  {
    renderIf: (value) =>  value.enabled == false ,
    icon: 'pi pi-history',
    tooltip: 'table.recover',
    action: (value, event) => table.activateElement(value, event)
  }]">


  </CustomTable>


</template>
<script setup lang="ts">

import { provide, onUnmounted, ref } from "vue";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import CustomTable from "@/components/table/CustomTable.vue";
import { Client } from "../models/client.model";
import type { User } from "../../users/models/user.model";
const { t } = useI18n();
const toast = useToast();
const dialog = useDialog();
provide("dialogRef", dialog);
const table = ref()
const client = new Client()

onUnmounted(() => {
  toast.removeAllGroups();
});
</script>
