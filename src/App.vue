<script setup lang="ts">
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <router-view v-slot="{ Component }">
    <Transition name="fade">
      <component :is="Component"/>
    </Transition>
  </router-view>
</template>
