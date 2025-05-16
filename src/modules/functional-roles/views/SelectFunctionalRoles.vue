<template>




    <Paginator :query-function="(params) => SelectedRole.getSelectedRoles(params)"
        gridClass="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"
        query-key="functional-roles">
        <template #header>
            <h2 text-left>Seleccione sus roles preferidos o evitados</h2>
        </template>

        <template #item-template="{ data }">
           <SelectRoleCard :role="data"/>

        </template>
    </Paginator>


</template>
<script setup lang="ts">
import Paginator from '@/components/Paginator.vue';
import { FunctionalRole } from '@/modules/management/functional-roles/models/functional-role.model';

import SelectRoleCard from './components/SelectRoleCard.vue';
import { SelectedRole } from '../models/selectedRole.model';






</script>

