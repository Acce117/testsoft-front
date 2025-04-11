<template>


    <Paginator :query-function="(params) => Group.getUsersFromCurrentGroup(params)" :query-key="'users-current-group'"
        gridClass="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        <template #header>
            <h2 text-left>Seleccione usuarios compatibles y liderazgo</h2>
        </template>
        <template #item-template="{ data }">
            <article
                class="rounded-md min-w-0 break-inside-avoid break-words text-left overflow-hidden border border-solid border-slate-200 bg-white w-full  flex  flex-col justify-between  gap-2 p-4 shadow-md">
                <div flex items-center w-full>

                    <Avatar :label="data.name.charAt(0).toUpperCase()"
                        style="background-color: #bae6fd; color: #0369a1;" class="mr-2" shape="circle" />
                    <span class=" text-slate-800 inline-flex flex-col items-start">
                        <span class="font-bold">{{ data.name }}</span>
                        <span class="text-sm">{{ data.username }}</span>
                    </span>
                </div>



                <div class="flex flex-col items-center justify-center gap-4 w-full ">
                    <div flex items-center justify-between gap-2 w-full>
                        <span>Para trabajar lo consideras?</span>
                        <ToggleButton min-w-10rem v-model="data.compatible" :onLabel="$t('Compatible')"
                            :offLabel="$t('Incompatible')" onIcon="pi pi-user-plus" offIcon="pi pi-user-minus" />
                    </div>
                    <div flex w-full items-center justify-between gap-2>

                        <span> Lo consideras lider?</span>
                        <ToggleButton v-model="data.leadership" onIcon="pi pi-crown" offIcon="pi pi-times"
                            :onLabel="$t('global.yes')" :offLabel="$t('global.no')" />

                    </div>


                </div>

            </article>

        </template>
    </Paginator>


</template>
<script setup lang="ts">
import Paginator from '@/components/Paginator.vue';
import { FunctionalRole } from '@/modules/management/functional-roles/models/functional-role.model';
import { Group } from '@/modules/management/group/models/group.model';
import { userStore } from '@/modules/security/store/user-store';
import { Avatar, Button, Checkbox, ToggleButton, ToggleSwitch } from 'primevue';
import { ref } from 'vue';



const gridOptions = ref({
    base: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 4,
    xxl: 5
})



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
