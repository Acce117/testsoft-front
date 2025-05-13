<script setup lang="ts">
import VNavbar from "@/components/navbar/Navbar.vue";
window.scrollTo(0, 0);
</script>

<template>
  <header>
    <nav>
      <VNavbar />
    </nav>
  </header>
  <main anim-fade-in-1>
    <RouterView></RouterView>
  </main>
</template>