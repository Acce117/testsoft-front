<template>
  <div
    class="presentation"
    centered
    flex-wrap
    gap-3rem
    w-32rem
    lg:w-50rem
    lg:gap-6.5rem
  >
    <!-- <VPresentationButtonsTestExecutor v-if="user.role.includes('Estudiante')" />
    <VPresentationButtonsAnalist v-else-if="user.role.includes('Analista')" /> -->
  </div>
</template>
<script setup lang="ts">
import { userStore } from "@/modules/security/store/user-store";
import VPresentationButtonsAnalist from "./VPresentationButtonsAnalist.vue";
import VPresentationButtonsTestExecutor from "./VPresentationButtonsTestExecutor.vue";
const user = userStore();
</script>
<style>
.presentation__button {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1.4rem;
  width: 12rem;
  height: 12rem;
  transition: all ease 0.2s;
  border-radius: var(--bradius);
  text-align: center;

  justify-content: center;
  align-items: center;
}
.presentation__button:hover {
  cursor: pointer;
}

.presentation__button:active {
  background-color: black;
  color: white;
}

.presentation__button img {
  width: 3rem;
}
.presentation__button:active img {
  filter: invert();
}

@media (min-width: 1024px) {
  .presentation__button {
    width: 20rem;
    height: 20rem;
    font-size: 1.8rem;
  }
  .presentation__button img {
    width: 5rem;
  }
}
</style>
