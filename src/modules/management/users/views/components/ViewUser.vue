<template>
  <div flex flex-col gap-2>
    <span><span text-primary>{{$t('user.name')}}: </span>{{ user.name }}</span>
    <span><span text-primary>{{$t('user.last_name')}}: </span>{{ user.last_name }}</span>
    <span><span text-primary>{{$t('user.username')}}: </span>{{ user.username }}</span>
    <span><span text-primary>{{$t('user.email')}}: </span>{{ user.email }}</span>
    <span><span text-primary>{{$t('user.country')}}: </span>{{ user.country.name }}</span>
    <!-- <span><span text-primary>{{$t('user.group')}}: </span>{{ user.assignments[0].role.name }}</span>
    <span><span text-primary>{{$t('user.role')}}: </span>{{ user.country.name }}</span> -->

  </div>
</template>
<script setup lang="ts">
import "vue3-treeselect/dist/vue3-treeselect.css";
import { useI18n } from "vue-i18n";
const user = defineModel()
const { t } = useI18n();
</script>
