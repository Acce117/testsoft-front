<script setup lang="ts">
import VNavbar from "@/components/navbar/VNavbar.vue";
window.scrollTo(0,0)
import {ref} from 'vue'
</script>

<template>
  <div class="general-view">
    <header>
      <nav>
        <VNavbar />
      </nav>
    </header>
    <main>
      <RouterView></RouterView>
    </main>
  </div>
</template>
<style>
.general-view {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  animation: 1s fade-in;
}


@media (min-width: 480px) {
 
}
@media (min-width: 768px) {
  
}

</style>
