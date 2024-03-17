<template>
  <div centered flex-wrap gap-8 w-32rem lg:w-50rem lg:gap-16>
    <button
      class="presentation__button"
      white-button
      @click="router.push('/select-test')"
    >
      <img src="/img/test_icon.svg" />
      {{ $t("home.option1") }}
    </button>

    <button class="presentation__button" white-button>
      <img src="/img/role.svg" />
      {{ $t("home.option2") }}
    </button>

    <button class="presentation__button" white-button>
      <img src="/img/equality.svg" />
      {{ $t("home.option3") }}
    </button>

    <button
      class="presentation__button"
      white-button
      @click="router.push('/results')"
    >
      <img src="/img/results.svg" />
      {{ $t("home.option4") }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<style>
.presentation__button {
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1.8rem;
  width: 15rem;
  height: 15rem;
}
.presentation__button:active {
  background-color: black;
  color: white;
}

.presentation__button img {
  width: 3rem;
}

@media (min-width: 1024px) {
  .presentation__button {
    width: 20rem;
    height: 20rem;
    font-size: 2rem;
  }
  .presentation__button img {
    width: 5rem;
  }
}
</style>
