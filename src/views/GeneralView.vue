<script setup lang="ts">
import VNavbar from "@/modules/general/VNavbar.vue";
</script>

<template>
  <div class="general-view">
    <header>
      <nav>
        <VNavbar />
      </nav>
    </header>
    <main>
      <slot> </slot>
    </main>
  </div>
</template>
<style>
.general-view {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 30rem;
  height: 70rem;
  overflow: hidden;
  border-radius: 1.5rem;
  box-shadow: 0 0 0.5rem 0.5rem rgba(0, 0, 0, 0.3);
}
@media (min-width: 480px) {
  .general-view{
    width: 450px;
  }
}
@media (min-width: 768px) {
  .general-view{
    width: 750px;
  }
}
@media (min-width: 1024px) {
  .general-view{
    width: 90vw;
  }
}
</style>
