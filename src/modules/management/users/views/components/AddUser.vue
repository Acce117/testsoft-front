<template>
  <VInput v-model="user.CI" name="CI" mask="99999999999" label="user.ci" />
  <VRadioButton label="user.sex" v-model="user.sex" name="sex" :options="['F', 'M']" />

  <VInput v-model="user.name" name="name" label="user.name" />

  <VInput v-model="user.last_name" name="last_name" label="user.last_name" />

  <VInput v-model="user.username" name="username" label="user.username" />
  <VInput v-model="user.password" password name="password" label="user.password" />

  <VInput v-model="user.email" name="email" label="user.email" />
  <VSelect v-model="user.country_id" name="country_id" label="user.country" :options="countries" optionLabel="name"
    optionId="country_id" />
  <VSelect v-model="user.item_id"  name="item_id" label="user.role" :options="roles" optionLabel="name" optionId="item_id" />
  <VTreeSelect v-model="user.group_id" :defaultValue="selectedGroup" :options="groups" name="group_id" label="user.group" />
</template>
<script setup lang="ts">
import "vue3-treeselect/dist/vue3-treeselect.css";
import { useI18n } from "vue-i18n";
import VInput from "@/components/VInput.vue";
import VSelect from "@/components/VSelect.vue";
import { useCountries } from "@/modules/management/country/composables/useCountries";
import { useGroups } from "@/modules/management/group/composables/useGroups";
import VTreeSelect from "@/components/VTreeSelect.vue";
import VRadioButton from "@/components/VRadioButton.vue";
import { ref } from "vue";
const props = defineProps({
  selectedGroup:{type:Object, required:true}
})
const user = defineModel()

const defaultGroup = Object.keys(props.selectedGroup)[0]
if(defaultGroup) user.value.group_id = defaultGroup
const roles = ref([
  { item_id: 1, name: 'Admin' },
  { item_id: 3, name: 'Executor' },
  { item_id: 2, name: 'Analyst' },


])

const { t } = useI18n();

const { countries, isPending } = useCountries()
const { groups } = useGroups()



</script>
