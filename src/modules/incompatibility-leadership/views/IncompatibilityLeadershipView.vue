<template>
  <section mt-6rem pa-2>
    <h1>Sociométrico </h1>
    <div rounded-xl pa-2 bg-white border-1 border-solid border-slate-200 shadow-md>
      <UserRelationsGraph />


    </div>
  </section>

</template>
<script setup lang="ts">

import { userStore } from "@/modules/security/store/user-store";
import { provide, onUnmounted } from "vue";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import UserRelationsGraph from "./components/UserRelationsGraph.vue";
const { t } = useI18n();
const toast = useToast();
const dialog = useDialog();
provide("dialogRef", dialog);


onUnmounted(() => {
  toast.removeAllGroups();
});
</script>
