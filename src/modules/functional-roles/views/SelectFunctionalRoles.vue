<template>
    <section class=" mt-8 mx-auto flex flex-col items-center ">

        <h1 class="text-center text-2xl lg:text-3xl p-4">Seleccione sus roles preferidos o evitados</h1>



        <Pagination :query-function="getRoles" :query-key="'functional-roles'">

            <template #item-template="{ data }">
                <article
                    class="rounded-md text-left overflow-hidden border border-solid border-slate-200 bg-white w-full  flex justify-between  gap-2 p-4 shadow-md">
                    <span class="w-full text-slate-500 font-bold text-left whitespace-nowrap overflow-hidden ">{{
                        data.rol_name.length >= 24 ? data.rol_name.substring(0, 24) + '...' : data.rol_name
                        }}</span>
                    <div class="flex items-center justify-center gap-2">

                        <i class="like-button pi pi-thumbs-up"
                            :style="{ 'color': data.preferred ? '#0ea5e9' : 'gray' }" />
                        <i class="like-button pi pi-thumbs-down" :style="{ 'color': data.avoided ? 'red' : 'gray' }" />
                        <i class="like-button pi pi-eye" :style="{ 'color': 'gray' }" />

                    </div>

                </article>

            </template>
        </Pagination>

    </section>

</template>
<script setup lang="ts">
import Pagination from './components/Pagination.vue';



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
</style>
