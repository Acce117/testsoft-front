<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useRouter } from 'vue-router'
const router = useRouter()
router.push('/login')
</script>

<template>
  <Transition name="fade">
    <RouterView />

  </Transition>
</template>

