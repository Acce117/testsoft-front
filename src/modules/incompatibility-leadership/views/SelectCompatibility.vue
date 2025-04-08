<template>
    <section class=" mt-8 mx-auto flex flex-col items-center ">

        <h1 class="text-center text-2xl lg:text-3xl p-4">Seleccione usuarios compatibles y liderazgo</h1>


        <Paginator :query-function="(params) => Group.getUsersFromCurrentGroup(params)"
            :query-key="'users-current-group'">

            <template #item-template="{ data }">
                <article
                    class="rounded-md text-left overflow-hidden border border-solid border-slate-200 bg-white w-full  flex  flex-col justify-between  gap-2 p-4 shadow-md">
                    <div flex w-full>

                        <Avatar :label="data.name.charAt(0).toUpperCase()"
                            style="background-color: #bae6fd; color: #0369a1;" class="mr-2" shape="circle" />
                        <span class=" text-slate-800 inline-flex flex-col items-start">
                            <span class="font-bold">{{ data.name }}</span>
                            <span class="text-sm">{{ data.username }}</span>
                        </span>
                    </div>

                    

                    <div class="flex flex-col items-center justify-center w-full ">
                        <div flex items-center justify-left gap-2 w-full>
                            <span>Para trabajar lo consideras?</span>
                            <Button icon="pi pi pi-user-plus" label="Compatible" severity="secondary" rounded
                                aria-label="Filter" />
                            <Button icon="pi pi pi-user-minus" label="Incompatible" severity="danger" rounded
                                aria-label="Filter" />
                        </div>
                        <div flex items-center justify-left gap-2 w-full>

                            <span> <Button icon="pi pi pi-crown" variant="text" severity="warn" rounded
                                    aria-label="Filter" /> Lo consideras lider?</span>
                            <Checkbox v-model="data.leadership" />

                        </div>


                    </div>

                </article>

            </template>
        </Paginator>

    </section>

</template>
<script setup lang="ts">
import Paginator from '@/components/Paginator.vue';
import { FunctionalRole } from '@/modules/management/functional-roles/models/functional-role.model';
import { Group } from '@/modules/management/group/models/group.model';
import { userStore } from '@/modules/security/store/user-store';
import { Avatar, Button, Checkbox, ToggleSwitch } from 'primevue';






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
