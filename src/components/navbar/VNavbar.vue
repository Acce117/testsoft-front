<template>
  <ul class="navbar">
    <li
      mt-0.5rem
      trans-0.2
      z-5
      hover:scale-110
      active:opacity-50
      active:scale-100
      cursor-pointer
      pointer-events-initial
      @click="goHome()"
    >
      <img src="/img/home.svg" w-3rem alt="home" />
    </li>
    <Menubar :model="items" />
    <VLanguageChanger />
  </ul>
</template>
<script setup lang="ts">
import VLanguageChanger from "../VLanguageChanger.vue";
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const router = useRouter();
const items = ref([
  {
    label: " ",
    items: [
      {
        label: " ",
        command: () => router.push("/select-test"),
      },
      {
        label: " ",
      },
      {
        label: " ",
      },
      {
        label: " ",
        command: () => router.push("/results"),
      },
    ],
  },
  {
    label: " ",
  },
  {
    label: " ",
    command: () => router.push("/profile"),
  },
]);

const updateNavbarLabels = () => {
  items.value.forEach((item, index) => {
    if (item.label) {
      item.label = t(`navbar.${index + 1}.name`);
    }
    if (item.items) {
      item.items.forEach((subItem, subIndex) => {
        subItem.label = t(`navbar.${index + 1}.${subIndex+1}`);
      });
    }
  });
};

updateNavbarLabels()

watch(locale, () => {
  updateNavbarLabels();
});

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
</style>
