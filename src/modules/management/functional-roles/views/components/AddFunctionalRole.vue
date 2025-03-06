<template>


  <VInput v-model="functionalRole.rol_name" name="rol_name" label="general.name" />

  <VInput v-model="functionalRole.rol_descrip" rows="3" textarea name="rol_descrip" label="general.description" />


  <VTreeSelect v-model="functionalRole.id_group" :defaultValue="defaultGroup" :options="groups" name="id_group"
    label="user.group" />
</template>
<script setup lang="ts">
import "vue3-treeselect/dist/vue3-treeselect.css";
import { useI18n } from "vue-i18n";
import VInput from "@/components/VInput.vue";
import { useGroups } from "@/modules/management/group/composables/useGroups";
import VTreeSelect from "@/components/VTreeSelect.vue";

const functionalRole = defineModel()

const { t } = useI18n();


const defaultGroup = {}

defaultGroup[functionalRole.value.group.id_group] = true


const { groups } = useGroups()


</script>
