<template>
    <section h-full flex flex-col m-3>
        <h2 mt-5rem text-left>Seleccione sus roles preferidos o evitados</h2>



        <Paginator :query-function="(params) => FunctionalRole.getAll(params)" gridClass="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" :query-key="'functional-roles'">

            <template #item-template="{ data }">
                <article
                    class="rounded-md  text-left overflow-hidden border border-solid border-slate-200 bg-white w-full  flex justify-between  gap-2 p-4 shadow-md">
                    <span class="role-text w-full  text-left whitespace-nowrap overflow-hidden ">{{
                        data.rol_name
                    }}</span>
                    <div class="flex items-center justify-center gap-2">

                        <i class="like-button pi pi-thumbs-up"
                            :style="{ 'color': data.preferred ? '#0ea5e9' : 'gray' }" />
                        <i class="like-button pi pi-thumbs-down" :style="{ 'color': data.avoided ? 'red' : 'gray' }" />
                        <i class="like-button pi pi-eye" :style="{ 'color': 'gray' }" />

                    </div>

                </article>

            </template>
        </Paginator>

    </section>

</template>
<script setup lang="ts">
import Paginator from '@/components/Paginator.vue';
import { FunctionalRole } from '@/modules/management/functional-roles/models/functional-role.model';



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
.role-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 400px;
}
</style>
