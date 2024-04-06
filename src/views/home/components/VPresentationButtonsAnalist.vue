<template>
    <button
      class="presentation__button"
      white-button
    >
      <img src="/img/graphic.svg" />
      {{ $t("home.option5") }}
    </button>

    <button class="presentation__button" white-button @click="router.push('/assign-test')">
      <img src="/img/assign_test.svg" />
      {{ $t("home.option6") }}
    </button>

    <button class="presentation__button" white-button>
      <img src="/img/group.svg" />
      {{ $t("home.option7") }}
    </button>

    <button
      class="presentation__button"
      white-button
      @click="router.push('/users')"
    >
      <img src="/img/user.svg" />
      {{ $t("home.option8") }}
    </button>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>