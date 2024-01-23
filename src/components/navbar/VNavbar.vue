<template>
    <ul class="navbar">
      <li class="navbar__option navbar__white-option" @click="goHome()">Home</li>
      <li>
        <img class="navbar__left-options-icon" src="/img/menu.svg">
        <ul class="navbar__left-options">
          <li class="navbar__option navbar__black-option">Ejecutar Test</li>
          <li class="navbar__option navbar__black-option">Contactos</li>
          <li class="navbar__option navbar__black-option" @click="logout()">
            Cerrar Sesión
          </li>
        </ul>
      </li>
    </ul>
  </template>
  <script setup lang="ts">
  import { useRouter } from "vue-router";
  const router = useRouter();
  const logout = () => {
    router.push("/login");
  };
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
  .navbar__left-options-icon {
    pointer-events: all;
    transition: all ease .2s;
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
    display: none;
    justify-content: space-between;
    list-style: none;
    gap: 2rem;
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
  @media (min-width: 1024px) {
  
    .navbar__left-options {
      display: flex;
    }
    .navbar__left-options-icon {
      display: none;
    }
  }
  </style>
  