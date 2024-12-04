<template>
  
      <CustomTable title="Usuarios" :model="user">
        <template #form-add>
          <AddUser v-model="user" />
        </template>
        <template #view-element>
          <ViewUser v-model="user" />
        </template>
      </CustomTable>
</template>
<script setup lang="ts">
import { User } from "../models/user.model";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import CustomTable from "@/components/CustomTable.vue";
import ViewUser from "./components/ViewUser.vue";
import AddUser from "./components/AddUser.vue";
const { t } = useI18n();

let user = ref(new User())

</script>
