<template>
  <div z-50 w-full>

    <Menubar :model="items">

      <template #start>

        <RouterLink to="/" size-10> <img src="/img/logo.png" size-10 /></RouterLink>
        <slot name="sidebar-button"></slot>

      </template>
      <template #end>
        <div flex items-center gap-2>
          <Select w-19 v-model="$i18n.locale" :options="$i18n.availableLocales">

          </Select>
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
const { t, locale } = useI18n();

const router = useRouter();


// const itemsDefault = [

// {
//     icon:'pi pi-home',
//     label: " ",
//     i18n: "home",
//     command: () => router.push("/"),
//   },

//   {
//     icon:'pi pi-info-circle',
//     label: " ",
//     i18n: "info",
//     command: () => router.push("/info"),
//   },
// ];
const items = ref([]);

// items.value.push(...itemsDefault);
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

const goHome = () => {
  router.push("/");
};
</script>
<style scoped>
.p-menubar {
  border-radius: 12px !important;
}
</style>

