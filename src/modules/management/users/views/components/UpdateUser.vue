<template>
  <VInput v-model="user.CI" name="CI" mask="99999999999" label="user.ci" />
  <VRadioButton label="user.sex" v-model="user.sex" name="sex" :options="['F', 'M']" />

  <VInput v-model="user.name" name="name" label="user.name" />

  <VInput v-model="user.last_name" name="last_name" label="user.last_name" />
  <VInput v-model="user.username" name="username" label="user.username" />
  <VInput v-model="user.email" name="email" label="user.email" />
  <VSelect :loading="isPending" v-model="user.country_id" :defaultValue="defaultCountry" name="country_id"
    label="user.country" optionId="country_id" :options="countries" optionLabel="name" />
  <VSelect :disabled="user.item_id==5 || (user.item_id==1 && userRole==1)" v-model="user.item_id" name="item_id" label="user.role" :defaultValue="defaultRole" :options="roles"
    optionLabel="name" optionId="item_id" />
  <VTreeSelect :disabled="user.item_id==5 || (user.item_id==1  && userRole==1)" v-model="user.group_id" :defaultValue :options="groups" name="group_id" label="user.group" />
  <VInput opacity-0 invisible v-model="user.assignment_id" name="assignment_id" label="user.name" />

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
import { userStore } from "@/modules/security/store/user-store";
import { useUserGroup } from "@/common/utils/useUserGroup";
const { t } = useI18n();
const userRole = userStore().assignments[0].item_id
const user = defineModel()
const roles = ref([
  { item_id: 3, name: t('roles.Executor') },
  { item_id: 2, name: t('roles.Analyst') },
])
if (userRole == 4 || userRole == 5 || (user.value.item_id==1 && userRole==1)) roles.value.push({ item_id: 1, name: t('roles.Admin') })

if (userRole == 4 || (user.value.item_id==5 && userRole==1)) roles.value.push({ item_id: 5, name: t('roles.Client')})
const defaultCountry = ref(user.value.country)
const defaultRole = ref(roles.value.filter((role) => user.value.assignments[0] && role.item_id == user.value.assignments[0].item_id)[0])

let defaultValue = {}

const { countries, isPending } = useCountries()
const { groups } = useGroups()
defaultValue[useUserGroup()] = true
user.value.country_id = user.value.country.country_id
user.value.group_id = user.value.assignments[0].group_id
user.value.item_id = user.value.assignments[0].item_id
user.value.assignment_id = user.value.assignments[0].assignment_id




</script>
