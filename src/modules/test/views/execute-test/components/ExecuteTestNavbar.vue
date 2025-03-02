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



const items = ref([]);


</script>
<style scoped>
.p-menubar {
  border: solid 1px rgb(226 232 240) !important;
  position: fixed !important;
  width: 100vw !important;
  z-index: 50;

}
</style>
