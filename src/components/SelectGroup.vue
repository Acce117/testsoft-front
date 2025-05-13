<script setup lang="ts">
import { useGroups } from '@/modules/management/group/composables/useGroups';
import { TreeSelect } from 'primevue';

defineProps({
    refetch:Function
})
const selectedGroup = defineModel({})
const { groups } = useGroups()

</script>

<template>
    <TreeSelect @change="() => {  if(refetch) refetch() }" 
            :placeholder="$t('user.filtergroup')" :options="groups" filter w-40 v-model="selectedGroup" />
</template>