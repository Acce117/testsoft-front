<template>
  <div z-50 w-full>

    <Menubar :model="items">

      <template #start>

        <RouterLink to="/" size-10> <img src="/img/logo.png" size-10 /></RouterLink>
        <slot name="sidebar-button"></slot>

      </template>
      <template #end>
        <div flex items-center gap-2>
          <SelectLanguage />

          <ToggleDarkMode />
          <UserAvatar />
        </div>

      </template>
    </Menubar>
  </div>


</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { userStore } from "@/modules/security/store/user-store";
import { siteStore } from "@/common/site/siteStore";
import UserAvatar from "@/components/navbar/components/UserAvatar.vue";
import Select from "primevue/select";
import ToggleDarkMode from "@/components/navbar/components/ToggleDarkMode.vue";
import SelectLanguage from "@/components/navbar/components/SelectLanguage.vue";
const { t, locale } = useI18n();

const router = useRouter();


const items = ref([]);

const updateNavbarLabels = () => {
  items.value.forEach((item: any) => {
    if (item.label) {
      item.label = t(`navbar.${item.i18n}.name`);
    }
    if (item.items) {
      item.items.forEach((subItem: any) => {
        subItem.label = t(`navbar.${item.i18n}.${subItem.i18n}`);
      });
    }
  });
};

updateNavbarLabels();

watch(locale, () => {
  updateNavbarLabels();
});


</script>
<style scoped>
.p-menubar {
  border-radius: 12px !important;
}
</style>
