<template>

    <Card class="   shadow-xl border-solid border-1 border-slate-300 dark:border-none dark:!bg-zinc-800  shadow-md">

        <template #content>
            <div text-left flex justify-between gap-2 >
                <p class="role-text w-fit m-0 !truncate text-left items-center flex ">{{
                    role.rol_name
                    }}</p>
                <div class="flex items-center justify-center">
                    <Button icon="pi pi-thumbs-up" :severity="role.preferred ? 'primary' : 'secondary'" variant="text"
                        rounded aria-label="Thumbs Up" @click="mutate(true)" />
                    <Button icon="pi pi-thumbs-down" :severity="role.avoided ? 'primary' : 'secondary'" variant="text"
                        rounded aria-label="Thumbs Down"  @click="mutate(false)" />
                    <Button icon="pi pi-eye" severity="secondary" variant="text" rounded aria-label="Eye" @click="toggle"/>
                    <Popover ref="popover">
            <p max-w-50vw min-w-25rem>{{ role.rol_descrip  }}
               </p>
        </Popover>


                </div>
            </div>
        </template>

    </Card>
</template>
<script setup lang="ts">
import { FunctionalRole } from '@/modules/management/functional-roles/models/functional-role.model';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Button, Card, Popover, useToast } from 'primevue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { SelectedRole } from '../../models/selectedRole.model';
import { userStore } from '@/modules/security/store/user-store';
const toast = useToast()
const queryClient = useQueryClient()
const { t } = useI18n()

const props = defineProps({
    role: {
        type: FunctionalRole,
        required: true
    }
})
const popover = ref();


const { mutate, isPending } = useMutation({
    mutationKey: [`prefer-role`],
    mutationFn: async (preferred) => {
        console.log(preferred)
        if(props.role.selected_role){
            await new SelectedRole({id_selected_role:props.role.selected_role}).update({preferred})
        }else {
            await new SelectedRole().create({fk_id_user:userStore().user_id, fk_id_rol:props.role.id_rol, preferred, fk_id_group:userStore().assignments[0].group_id})
        }
    },
    onSuccess: async () => {
        await queryClient.refetchQueries({
            queryKey: ['functional-roles']
        })
        toast.add({ severity: 'info', summary: t('global.operation_succeded'), detail: t('table.element_ok_added'), life: 5000 });
        
    },
    onError: (error) => {
        toast.add({ severity: 'error', summary: t('global.operation_failed'), detail: t(error.message), life: 5000 });
    }
})


const toggle = (event) => {
    popover.value.toggle(event);
}
</script>