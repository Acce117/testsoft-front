<script setup lang="ts">
import VUserCard from "@/components/VUserCard.vue";
import { userStore } from "../../store/user-store";
const user = userStore();
</script>
<template>
  
  <h2 class="page-title">{{ $t("profile.title") }}</h2>
  <VUserCard
    m-auto
    mt-4rem
    :name="user.name +' '+ user.last_name"
    :role="user.role"
    :id="user.ci"
    :username="user.username"
    :mail="user.email"

    :group="user.groupName"
  />
  
  
</template>
<style></style>
