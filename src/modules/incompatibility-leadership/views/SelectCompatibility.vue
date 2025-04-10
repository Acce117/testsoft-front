<template>
    <section h-full flex flex-col m-3>
        <h2 mt-5rem text-left>Seleccione usuarios compatibles y liderazgo</h2>


        <Paginator :query-function="(params) => Group.getUsersFromCurrentGroup(params)"
            :query-key="'users-current-group'" :gridOptions>

            <template #item-template="{ data }">
                <article
                    class="rounded-md text-left overflow-hidden border border-solid border-slate-200 bg-white w-full  flex  flex-col justify-between  gap-2 p-4 shadow-md">
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
                            <ToggleButton  v-model="data.compatible" :onLabel="$t('Compatible')"

                                :offLabel="$t('Incompatible')"
                                onIcon="pi pi-user-plus" offIcon="pi pi-user-minus" />
                        </div>
                        <div flex w-full items-center justify-between gap-2 >

                            <span> Lo consideras lider?</span>
                            <ToggleButton v-model="data.leadership" onIcon="pi pi-crown" offIcon="pi pi-times"
                                :onLabel="$t('global.yes')" :offLabel="$t('global.no')" />

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
import { Avatar, Button, Checkbox, ToggleButton, ToggleSwitch } from 'primevue';


const gridOptions = {
    base: 1,
    md: 1,
    lg: 2,
    xl: 3

}



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
