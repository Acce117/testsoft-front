<template>

  <CustomTable title="Usuarios" :model="user" fieldAsId="user_id">
    <template #form-add>
      <VInput id="name" v-model="user.name" text="Nombres" />


      <VInput id="lastname" v-model="user.last_name" text="Apellidos"/>

      <VInput id="username" v-model="user.username" text="Nombre de Usuario" :validation="validateUsername" />
      <VInput id="email-table" v-model="user.email" text="Email" :validation="validateEmail" />
      <Treeselect v-model="user.fk_id_group" w-15rem :options="groups" :clearable="false" :multiple="false" :flat="true"
        :disable-branch-nodes="true" :searchable="false" v-on:select="(node: any) => onGroupSelected(node, data)" />


    </template>

  </CustomTable>










  <VAddUserDialog v-model="addDialog" :users="result" :groups="groups" />
</template>
<script setup lang="ts">
import Treeselect from "vue3-treeselect";
import VTable from "@/components/VTable.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { getUsers, deleteUser, updateUser, User } from "../models/user.model";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useConfirm } from "primevue/useconfirm";
import { validateEmail, validateEmptyString } from "@/common/utils/validations";
import VAddUserDialog from "./dialogs/VAddUserDialog.vue";
import { useSendRequest } from "@/common/utils/fetch";
import CustomTable from "@/components/CustomTable.vue";
import VInput from "@/components/VInput.vue";
const confirm = useConfirm();
const onGroupSelected = (node: any, user: any) => {
  user.student_group.name_group = node.label;
};
let user = ref(new User())
console.log(user.value)
const { t } = useI18n();


const groups = useSendRequest(
  true,
  `${import.meta.env.VITE_API_PATH}/gestion/group`
).result;


const validateUsername = (text: string) => {
  validateEmptyString(text);
  let existentUsername = result.value.filter(
    (user) => user.user.username === text
  );
  if (existentUsername.length > 1) throw new Error("error.existent_username");
};
const addDialog = ref(false);
</script>
