<template>
  <VInput v-model="group.name_group" name="name_group" label="Nombre" />
  <VTreeSelect v-if="!group.id_group" v-model="group.father_group" :options="groups" name="father_group" :defaultValue="defaultGroup"  label="Grupo al que Pertenece"  />

</template>
<script setup lang="ts">
import "vue3-treeselect/dist/vue3-treeselect.css";
import { useI18n } from "vue-i18n";
import VInput from "@/components/VInput.vue";
import { useGroups } from "@/modules/management/group/composables/useGroups";
import VTreeSelect from "@/components/VTreeSelect.vue";
import { computed } from "vue";
const group = defineModel()

const { t } = useI18n();
const { groups } = useGroups()

const defaultGroup = computed(()=>{
  return groups.value? groups.value.filter((g)=>g.key==1)[0]:null
})
</script>
