<template>
  <VInput v-model="user.name" name="name" label="Nombres" />

  <VInput v-model="user.last_name" name="last_name" label="Apellidos" />

  <VInput v-model="user.username" name="username" label="Nombre de Usuario" />
  <VInput v-model="user.email" name="email" label="Email" />
  <Treeselect v-model="user.fk_id_group" w-15rem :options="groups" :clearable="false" :multiple="false" :flat="true"
    :disable-branch-nodes="true" :searchable="false" v-on:select="(node: any) => onGroupSelected(node, data)" />

</template>
<script setup lang="ts">
import Treeselect from "vue3-treeselect";
import "vue3-treeselect/dist/vue3-treeselect.css";
import { useI18n } from "vue-i18n";
import VInput from "@/components/VInput.vue";
import { useSendRequest } from "@/common/utils/fetch";

const user = defineModel()

const { t } = useI18n();

const groups = useSendRequest(
  true,
  `${import.meta.env.VITE_API_PATH}/gestion/group`
).result;

const onGroupSelected = (node: any, user: any) => {
  user.student_group.name_group = node.label;
  console.log(node)

};



</script>
<style></style>
