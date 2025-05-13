<template>




    <Paginator :query-function="(params) => FunctionalRole.getAll(params)"
        gridClass="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"
        :query-key="'functional-roles'">
        <template #header>
            <h2 text-left>Seleccione sus roles preferidos o evitados</h2>
        </template>

        <template #item-template="{ data }">
            <Card class="   shadow-xl border-solid border-1 border-slate-300 dark:border-none dark:!bg-zinc-800  shadow-md">
                <template #content>
                    <div text-left flex justify-between gap-2>
                        <p class="role-text w-full m-0 truncate text-left  ">{{
                            data.rol_name
                        }}</p>
                        <div class="flex items-center justify-center gap-4">

                            <i class="like-button pi pi-thumbs-up"
                                :style="{ 'color': data.preferred ? '#0ea5e9' : 'gray' }" />
                            <i class="like-button pi pi-thumbs-down"
                                :style="{ 'color': data.avoided ? 'red' : 'gray' }" />
                            <i class="like-button pi pi-eye" :style="{ 'color': 'gray' }" />

                        </div>
                    </div>
                </template>

            </Card>

        </template>
    </Paginator>


</template>
<script setup lang="ts">
import Paginator from '@/components/Paginator.vue';
import { FunctionalRole } from '@/modules/management/functional-roles/models/functional-role.model';
import { Card } from 'primevue';



const getRoles = () => [
    { id_rol: 1, rol_name: 'Juan', rol_descrip: 'juidsa', preferred: true },
    { id_rol: 2, rol_name: 'Ju2an', rol_descrip: 'juidsa' },
    { id_rol: 3, rol_name: 'Juasan', rol_descrip: 'juidsa' },
    { id_rol: 4, rol_name: 'Juanitasd', rol_descrip: 'juidsa', avoided: true },
    { id_rol: 5, rol_name: 'Ju213an', rol_descrip: 'juidsa' },]



//getBibliosForLoan(startIndex.value, paginationSize.value, searchTerm.value.trim() != '' ? searchTerm.value : null)






</script>
<style>
.like-button {
    cursor: pointer;
    transition: all .05s ease;
}

.like-button:active {
    transform: scale(1.1);
}

/* .role-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 400px;
} */
</style>
