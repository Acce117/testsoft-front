<script setup lang="ts">
import { RouterView } from "vue-router";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import DynamicDialog from "primevue/dynamicdialog";
</script>
<template>
  <div  class="background" ></div>
  <router-view />
  <Toast position="top-left" />
  <ConfirmDialog />
  <DynamicDialog />
</template>
