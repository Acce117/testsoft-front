<template>
  <div
    class="presentation"
    centered
    flex-wrap
    gap-4.5rem
    w-32rem
    md:w-40rem
    md:gap-6.5rem
  >
  <div class="presentation__center">
  </div>
    <VPresentationButtonsTestExecutor v-if="user.role.includes('Estudiante')"/>
    <VPresentationButtonsAnalist v-else-if="user.role.includes('Analista')"/>
  </div>
</template>
<script setup lang="ts">
import { userStore } from "@/modules/security/store/user-store";
import VPresentationButtonsAnalist from './VPresentationButtonsAnalist.vue'
import VPresentationButtonsTestExecutor from './VPresentationButtonsTestExecutor.vue'
const user = userStore()
</script>
<style>
.presentation {
  animation: star linear 100s infinite reverse;
}


.presentation__center{
  position:absolute;
  animation: star linear 100s infinite;
  width:15rem;
  height:15rem;
  background-color: rgba(255, 255, 255, 0.181);
  border-radius: var(--bradius);
}
.presentation__button {
  display:flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1.4rem;
  width: 12rem;
  height: 12rem;
  transition:background-color ease .2s;
  border-radius: var(--bradius);
  text-align: center;

  justify-content: center;
  align-items: center;
  animation: star linear 100s infinite;
}
.presentation__button:hover{
  cursor:pointer;
}

.presentation__button:active {
  background-color: black;
  color: white;
}

.presentation__button img {
  width: 3rem;
}
.presentation__button:active img {
  filter:invert();
}

@media (min-width: 768px) {
  .presentation__button {
    width: 16rem;
    height: 16rem;
    font-size: 1.8rem;
  }
  .presentation__button img {
    width: 5rem;
  }
  .presentation__center{
    width: 16rem;
    height: 16rem;

  }
}
@keyframes star {
  0% {
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
