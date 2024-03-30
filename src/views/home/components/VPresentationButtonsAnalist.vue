<template>
    <div
      class="presentation__button"
      white-button
    >
      <img src="/img/graphic.svg" />
      {{ $t("home.option5") }}
    </div>

    <div class="presentation__button" white-button @click="router.push('/assign-test')">
      <img src="/img/assign_test.svg" />
      {{ $t("home.option6") }}
    </div>

    <div class="presentation__button" white-button>
      <img src="/img/group.svg" />
      {{ $t("home.option7") }}
    </div>

    <div
      class="presentation__button"
      white-button
      @click="router.push('/users')"
    >
      <img src="/img/user.svg" />
      {{ $t("home.option8") }}
    </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>