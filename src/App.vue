<script setup lang="ts">
import { RouterView } from "vue-router";
import Toast from "primevue/toast";
</script>
<template>
  <router-view/>
  <Toast position="top-left" />
  <ConfirmDialog/>
</template>
