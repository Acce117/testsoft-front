<template>
    <div
      class="presentation__button"
      white-button
      @click="router.push('/select-test')"
    >
      <img src="/img/test_icon.svg" />
      {{ $t("home.option1") }}
    </div>

    <div class="presentation__button" white-button>
      <img src="/img/role.svg" />
      {{ $t("home.option2") }}
    </div>

    <div class="presentation__button" white-button>
      <img src="/img/equality.svg" />
      {{ $t("home.option3") }}
    </div>

    <div
      class="presentation__button"
      white-button
      @click="router.push('/results')"
    >
      <img src="/img/results.svg" />
      {{ $t("home.option4") }}
    </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>