<template>
  <ul class="navbar">
    <li class="navbar__home" @click="goHome()">
      <img src="/img/home.svg" alt="home" />
    </li>

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
}
.p-menubar {
  width: 100%;
  font-size: 2rem;
  background-color: transparent;
  border: none;
  justify-content: end;
  
}
.p-menubar.p-menubar-mobile .p-menubar-button {
  color: white;
  height: 3rem;
  width: 3rem;
  transition: all ease 0.3s;
}
.p-menubar.p-menubar-mobile .p-menubar-button:hover {
  background-color: transparent;
  scale: 1.2;
}
.p-menubar.p-menubar-mobile .p-menubar-button:active {
  opacity: 0.5;
  scale: 1;
}
.p-menubar-root-list {
  border-radius: 1.5rem;
  animation: scale 0.5s;
  background-color: white;

}
.p-menuitem-link {
  padding: 1rem;
}
.p-submenu-list {
  border-radius: 1.5rem;}

  
.p-menuitem-text,
.p-submenu-icon {
  color: black;
}
.p-menuitem-content {
  transition: all ease 0.3s;
  border-radius: 1.5rem;
}
.p-menubar .p-menuitem.p-highlight > .p-menuitem-content {
  background-color: black;
}
.p-menubar .p-menuitem.p-highlight > .p-menuitem-content .p-menuitem-text,
.p-menubar .p-menuitem.p-highlight > .p-menuitem-content .p-submenu-icon {
  color: white;
}
.navbar__home {
  margin-top: 0.5rem;
  transition: all ease 0.2s;
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
@media (min-width: 1024px) {
  .navbar__home {
    margin-left: 2rem;
  }
}
</style>
