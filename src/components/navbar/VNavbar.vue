<template>
  <ul class="navbar">
    <li class="navbar__option navbar__white-option" @click="goHome()">Home</li>
    <li>
      <img
        class="navbar__left-options-icon"
        src="/img/menu.svg"
        ref="menuIcon"
        @click="toggleMenu()"
      />
      <ul class="navbar__left-options not-visible" ref="menu">
        <li class="navbar__option navbar__black-option" @click="goTests()">
          Tests
        </li>
        <li class="navbar__option navbar__black-option" @click="logout()">
          Roles
        </li>
        <li class="navbar__option navbar__black-option" @click="logout()">
          Compatibilidades
        </li>
        <li class="navbar__option navbar__black-option" @click="logout()">
          Resultados
        </li>
        <li class="navbar__option navbar__black-option">Info</li>
        <li class="navbar__option navbar__black-option" @click="goProfile()">
          Perfil
        </li>
      </ul>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
const router = useRouter();
const menuIcon = ref();
const menu = ref();
const toggleMenu = () => {
  let classList = menu.value.classList;
  if (classList[1] === "not-visible") {
    classList.remove("not-visible");
    classList.add("visible");
  } else {
    classList.remove("visible");
    classList.add("not-visible");
  }
};

const handleOutsideClick = (event: { target: any; }) => {
  if (window.innerWidth < 1024 && !(menu.value.contains(event.target)||menuIcon.value.contains(event.target))) {
    let classList = menu.value.classList;
    classList.remove("visible");
    classList.add("not-visible");
  }
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});
onUnmounted(()=>{
  document.removeEventListener("click", handleOutsideClick);
})

const logout = () => {
  router.push("/login");
};
const goHome = () => {
  router.push("/");
};
const goTests = () => {
  router.push("/select-test");
};
const goProfile = () => {
  router.push("/profile");
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
.navbar__left-options-icon {
  pointer-events: all;
  transition: all ease 0.2s;
  width: 4rem;
}
.navbar__left-options-icon:hover {
  scale: 1.2;
}
.navbar__left-options-icon:active {
  opacity: 0.5;
  scale: 1;
}
.navbar__left-options {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 1rem;
  top: 7rem;
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 0rem 0rem 0.6rem 0.6rem #00000030;
  justify-content: space-between;
  list-style: none;
  padding: 1rem;
  gap: 0.5rem;
  transition: all ease 0.2s;
}
.navbar__option {
  z-index: 1;
  font-size: 2rem;
  padding: 0.5rem;
  border-radius: 1.5rem;
  text-align: center;
  user-select: none;
  cursor: pointer;
}
.navbar__white-option {
  color: white;
  transition: all ease 0.2s;
  justify-self: left;
}
.navbar__white-option:hover {
  color: black;
  background-color: white;
}
.navbar__black-option {
  color: black;
  transition: all ease 0.2s;
}
.navbar__black-option:hover {
  color: white;
  background-color: black;
}
.visible {
  opacity: 1;
  visibility: visible;
  transform: scaleY(1);
}
.not-visible {
  opacity: 0;
  visibility: hidden;
  transform: scaleY(0);
}
@media (min-width: 1024px) {
  .navbar__left-options {
    position: static;
    flex-direction: row;
    padding: 0;
    border-radius: 0;
    background-color: transparent;
    box-shadow: none;
  }
  .navbar__left-options-icon {
    display: none;
  }
  .visible {
    opacity: 1;
    visibility: visible;
  }
  .not-visible {
    opacity: 1;
    visibility: visible;
    transform: scaleY(1);
  }
}
</style>
