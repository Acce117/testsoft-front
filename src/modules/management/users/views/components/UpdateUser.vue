<template>
  <VInput v-model="user.CI" name="CI" mask="99999999999" label="Carnet de Identidad" />
  <VRadioButton label="Sexo" v-model="user.sex" name="sex" :options="['F', 'M']" />

  <VInput v-model="user.name" name="name" label="Nombres" />

  <VInput v-model="user.last_name" name="last_name" label="Apellidos" />
  <VInput v-model="user.username" name="username" label="Nombre de Usuario" />
  <VInput v-model="user.email" name="email" label="Email" />
  <VSelect :loading="isPending" v-model="user.country_id" :defaultValue="defaultCountry" name="country_id" label="País" optionId="country_id" :options="countries" optionLabel="name" />
  <VSelect v-model="user.item_id"  name="item_id" label="Rol" :defaultValue="defaultRole" :options="roles" optionLabel="name" optionId="item_id" />
  <VTreeSelect v-model="user.group_id" :defaultValue :options="groups" name="group_id" label="Grupo" />

</template>
<script setup lang="ts">
import "vue3-treeselect/dist/vue3-treeselect.css";
import { useI18n } from "vue-i18n";
import VInput from "@/components/VInput.vue";
import VSelect from "@/components/VSelect.vue";
import { useCountries } from "@/modules/management/country/composables/useCountries";
import { useGroups } from "@/modules/management/group/composables/useGroups";
import { ref } from "vue";
import VTreeSelect from "@/components/VTreeSelect.vue";
import VRadioButton from "@/components/VRadioButton.vue";

const user = defineModel()
const roles = ref([
  { item_id: 1, name: 'Admin' },
  { item_id: 3, name: 'Executor' },
  { item_id: 2, name: 'Analyst' },
  { item_id: 4, name: 'Super Admin' },



])
const defaultCountry =  ref( user.value.country)
const defaultRole =  ref( roles.value.filter((role)=>role.item_id==user.value.assignments[0].item_id)[0])

let defaultValue = {}
const { t } = useI18n();

const { countries, isPending } = useCountries()
const { groups } = useGroups()
defaultValue[user.value.assignments[0].group_id] = true

user.value.country_id = user.value.country.country_id
user.value.group_id = user.value.assignments[0].group_id
user.value.item_id = user.value.assignments[0].item_id


</script>
