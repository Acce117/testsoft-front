<template>


    <Paginator :query-function="(params) => Group.getUsersFromCurrentGroup(params)" :query-key="'users-current-group'"
        gridClass="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        <template #header>
            <h2 text-left>{{ t('title') }}</h2>
        </template>
        <template #item-template="{ data }">
            <Card
                class=" text-left shadow-xl border-solid border-1 border-slate-300 dark:border-none dark:!bg-zinc-800    shadow-md">
                <template #content>
                    <div flex items-center w-full mb-3>

                        <Avatar :label="data.name.charAt(0).toUpperCase()"
                            style="background-color: #bae6fd; color: #0369a1;" class="mr-2" shape="circle" />
                        <span class="  inline-flex flex-col items-start">
                            <span class="font-bold">{{ data.name }}</span>
                            <span class="text-sm">{{ data.username }}</span>
                        </span>
                    </div>



                    <div class="flex flex-col items-center justify-center gap-4 w-full ">
                        <div flex items-center justify-between gap-2 w-full>
                            <span>{{ t('compatibility') }}</span>
                            <ToggleButton v-model="data.compatible" :onLabel="$t('global.yes')"
                                :offLabel="$t('global.no')" onIcon="pi pi-user-plus" offIcon="pi pi-user-minus" />
                        </div>
                        <div flex w-full items-center justify-between gap-2>

                            <span>{{ t('leadership') }} </span>
                            <ToggleButton v-model="data.leadership" onIcon="pi pi-crown" offIcon="pi pi-times"
                                :onLabel="$t('global.yes')" :offLabel="$t('global.no')" />

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
import { Group } from '@/modules/management/group/models/group.model';
import { userStore } from '@/modules/security/store/user-store';
import { Avatar, Button, Card, Checkbox, ToggleButton, ToggleSwitch } from 'primevue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


const { t } = useI18n()
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
<i18n lang="json">{
    "es": {
        "title": "Selección de Equipo y Liderazgo",
        "compatibility": "¿Trabajarías bien con esta persona?",
        "leadership": "¿Lo considera apto para liderazgo?"
    },
    "en": {
        "title": "Team Compatibility and Leadership Assessment",
        "compatibility": "Would this person be compatible to work with you?",
        "leadership": "Does this person demonstrate leadership potential?"
    }
}</i18n>
