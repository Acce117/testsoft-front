<template>
  <VInput v-model="group.name_group" name="name_group" label="group.name_group" />
  <VTreeSelect  :defaultValue v-model="group.father_group" :options="groups" name="father_group"  label="group.father_group"  />
</template>
<script setup lang="ts">
import "vue3-treeselect/dist/vue3-treeselect.css";
import { useI18n } from "vue-i18n";
import VInput from "@/components/VInput.vue";
import VTreeSelect from "@/components/VTreeSelect.vue";
import { useGroupsForGroupUpdate } from "../../composables/useGroupsForGroupUpdate";
const group = defineModel()

const { t } = useI18n();
const { groups } = useGroupsForGroupUpdate(group.value.father_group)
let defaultValue = {}
defaultValue[group.value.father_group] = true

</script>
