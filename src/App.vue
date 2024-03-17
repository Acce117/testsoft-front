<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import DynamicDialog from "primevue/dynamicdialog";
import useEvents from "./common/utils/useEvents";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const router = useRouter();
const toast = useToast();
const confirm = useConfirm();

useEvents().addListener('error', (event: CustomEventInit)=>{
  toast.add(event.detail);
});
useEvents().addListener('redirect', (event: CustomEventInit)=>{
  router.push(event.detail);
  toast.removeAllGroups();
});
useEvents().addListener('confirm', (event: CustomEventInit)=>{
  confirm.require(event.detail);
})
</script>
<template>
  <div class="background">
    <div class="background__content"></div>
  </div>
  <router-view />
  <Toast position="top-left" />
  <ConfirmDialog />
  <DynamicDialog />
</template>
