<template>
  <ul class="navbar">
    <li class="navbar__home" @click="goHome()">
      <img src="/img/home.svg" alt="home" />
    </li>
    <span class="background__shape"></span>
    <Menubar :model="items" />
  </ul>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import { ref } from "vue";
const router = useRouter();
const items = ref([
  {
    label: "Test",
    items: [
      {
        label: "Ejecutar Test",
        command: () => router.push("/select-test"),
      },
      {
        label: "Roles",
      },
      {
        label: "Compatibilidades",
      },
      {
        label: "Ver Resultados",
        command: () => router.push("/results"),
      },
    ],
  },
  {
    label: "Info",
  },
  {
    label: "Perfil",
    command: () => router.push("/profile"),
  },
]);

const goHome = () => {
  router.push("/");
};
</script>
<style>
.navbar {
  z-index: 4;
  position: absolute;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  top: 0;
  left: 0;
  list-style: none;
  background-color: transparent;
}

.navbar__home {
  margin-top: 0.5rem;
  transition: all ease 0.2s;
  z-index: 5;
}
.navbar__home img {
  cursor: pointer;
  pointer-events: all;
  transition: all ease 0.2s;
  width: 3rem;
}
.navbar__home:hover {
  scale: 1.2;
}
.navbar__home:active {
  opacity: 0.5;
  scale: 1;
}
.background__shape{
  top:0;
  left: 0;
  z-index: 4;
  background-color: black;
  position: absolute;
  width: 100%;
  height: 6rem;
  
}
@media (min-width: 1024px) {
  .navbar__home {
    margin-left: 2rem;
  }
  .background__shape{
    width: 9rem;
    border-radius: 0 0 1.5rem 0;
  }
}
</style>
