<template>

  <TableServerPagination ref="table" :title="t('clients.title')" :visibleViewButton="false" :visibleUpdateButton="false" :visibleDeleteButton="false" :visibleCreateButton="false" :model="client" :query-options="{
    
  }"
  :extra-options="[ 
  {
    renderIf: (value:User) => value.enabled == true ,
    icon: 'pi pi-trash',
    tooltip: 'table.desactivate',
    action: (value, event) => table.desactivateElement(value, event)
  },
  {
    renderIf: (value:User) =>  value.enabled == false ,
    icon: 'pi pi-history',
    tooltip: 'table.recover',
    action: (value, event) => table.activateElement(value, event)
  }]">


  </TableServerPagination>


</template>
<script setup lang="ts">

import { provide, onUnmounted, ref } from "vue";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import { Client } from "../models/client.model";
import type { User } from "../../users/models/user.model";
import TableServerPagination from "@/components/table/TableServerPagination.vue";
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
