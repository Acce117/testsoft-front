<script setup lang="ts">
import { userStore } from "../../store/user-store";;

import { siteStore } from "@/common/site/siteStore";

const user = userStore();

</script>
<template>
  <h2 class="page-title">{{$t('profile.title') }}</h2>
  <div class="profile">
    <span>{{$t('profile.name') }}: {{ user.username }}</span>
    <span>{{$t('profile.id') }}:{{ user.ci }}</span>
    <span v-if="user.group">{{$t('profile.group') }}: {{ user.group }}</span>
    <span>{{$t('profile.role') }}: {{ user.role }}</span>
    <span v-if="user.userType">{{$t('profile.usertype') }}: {{ user.userType }}</span>
    <button black-button w-15rem font-size-2rem class="p-ripple" v-ripple @click="siteStore().logout()">
      {{$t('profile.close-session') }}
    </button>
  </div>
</template>
<style>
.profile {
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 2rem 3rem;
  gap: 2rem;
  font-size: 2rem;
  text-wrap: wrap;
  animation: fade-in 1s;
  color: white;
}

</style>
