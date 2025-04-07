<template>
    <i mx-1 class="pi pi-trash" v-tooltip="$t('table.desactivate')" @click="action($event)" />

</template>
<script setup lang="ts">
import { inject, type Ref } from 'vue';
import { BaseModel } from '@/common/utils/BaseModel';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useConfirm, useToast } from 'primevue';
import { useI18n } from 'vue-i18n';

const queryClient = useQueryClient()

const queryKey = inject<Ref<string>>('queryKey')
const confirm = useConfirm()
const toast = useToast()
const { t } = useI18n()


const model = inject<BaseModel>('model')
const props = defineProps({
    dataToDesactivate: {
        type: Object,
        required: true
    }
})



const action = (event: MouseEvent) => {


    confirm.require({
        target: event.currentTarget,
        header: t('table.desactivate'),

        message: t('table.desactivate_element_ask'),
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: t('global.cancel'),
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: t('global.confirm')
        },
        accept: () => {
            let updateObject = { ...props.dataToDesactivate }
            // for (const key in updateObject) {
            //     if (key.includes('date'))
            //         updateObject[key] = parseDate(updateObject[key]);
            // }
            console.log('wqewew')
            updateObject[model?.getFieldAsActive()] = 0
            model?.setData(updateObject)
            console.log(updateObject)
            mutate(updateObject)
        },
    });
};


const { mutate } = useMutation({
    mutationKey: [`${queryKey}-activate`],
    mutationFn: (data: object) => model.update(data),
    onSuccess: async () => {
        await queryClient.refetchQueries({
            queryKey: [queryKey]
        })
        toast.add({ severity: 'info', summary: t('table.confirmation'), detail: t('table.element_ok_updated'), life: 5000 });
        model?.clearData()
    },
    onError: (error) => {
        toast.add({ severity: 'error', summary: t('table.something_wrong'), detail: error.statusCode == 404 ? t('table.relations_error') : t(error.message), life: 5000 });
    }
})



</script>