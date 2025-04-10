<template>
    <Button icon="pi pi-trash" severity="danger" variant="text" rounded aria-label="Trash"
        v-tooltip="$t('table.delete')" @click="action($event)" />
</template>
<script setup lang="ts">
import { inject, type Ref } from 'vue';
import { BaseModel } from '@/common/utils/BaseModel';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Button, useConfirm, useToast } from 'primevue';
import { useI18n } from 'vue-i18n';

const queryClient = useQueryClient()

const queryKey = inject<Ref<string>>('queryKey')
const confirm = useConfirm()
const toast = useToast()
const {t}=useI18n()


const model = inject<BaseModel>('model')
const props = defineProps({
    dataToDelete: {
        type: Object,
        required: true
    }
})


const action = (event:MouseEvent) => {

    confirm.require({
        target: event.currentTarget,
        header: t('table.delete'),
        message: t('table.delete_element_ask'),
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: t('global.cancel'),
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: t('table.delete'),
            severity: 'danger',
        },
        accept: () => {
            model?.setData(props.dataToDelete)
            mutate()
        },
    });
};

const { mutate } = useMutation({
    mutationKey: [`${queryKey}-delete`],
    mutationFn: () => model.delete(),
    onSuccess: async () => {
        await queryClient.refetchQueries({
            queryKey: [queryKey]
        })
        toast.add({ severity: 'info', summary: t('table.confirmation'), detail: t('table.element_ok_deleted'), life: 5000 });
        model?.clearData()
    },
    onError: async (error) => {
        // if (error instanceof EmailError) {
        //     await refetch()

        //     toast.add({ severity: 'info', summary: t('table.confirmation'), detail: t('table.element_ok_deleted'), life: 5000 });

        //     toast.add({ severity: 'error', summary: t('table.something_wrong'), detail:t(error.message), life: 5000 });

        // } else
        toast.add({ severity: 'error', summary: t('table.something_wrong'), detail: t(error.message), life: 5000 });
    }
})



</script>