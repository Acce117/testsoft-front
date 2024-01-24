<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <Transition name="fade">
    <router-view />
  </Transition>
</template>
