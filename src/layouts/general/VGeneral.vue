<script setup lang="ts">
import VNavbar from "@/components/navbar/VNavbar.vue";
window.scrollTo(0,0)
</script>

<template>
  <div class="general-view">
    <header>
      <nav>
        <VNavbar />
      </nav>
    </header>
    <main>
      <span class="background__shape"></span>
      <RouterView></RouterView>
    </main>
  </div>
</template>
<style>
.general-view {
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
  margin: .5rem 0;
}
.background__shape{
  background-color: black;
  position: absolute;
  width: 100%;
  height: 6rem;
  border-radius: 0 0 1.5rem 0;
}

@media (min-width: 480px) {
  .general-view{
    width: 45rem;
  }
}
@media (min-width: 768px) {
  .general-view{
    width: 75rem;
  }
}
@media (min-width: 1024px) {
  .general-view{
    width: 90vw;
  }
  .background__shape{
    width: 9rem;
  }
}
</style>
