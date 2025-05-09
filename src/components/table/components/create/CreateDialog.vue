<template>

    <Dialog v-model:visible="visible" modal :header="$t('global.add')" class="w-4/5 max-w-50rem min-w-25rem">

        <span>{{ $t('table.new_element') }}</span>
        <Form @submit="() => mutate()" :validation-schema="model?.getSchema()">
            <div class="dialog-form">
                <slot name="form"></slot>
            </div>
            <div class="dialog-footer">
                <Button type="button" :label="$t('global.cancel')" severity="secondary"
                    @click="visible = false"></Button>
                <VButton w-8rem :disabled="isPending || isFormDataLoading" type="submit">
                    <span v-if="!isPending || isFormDataLoading">{{ $t("global.save") }} </span>
                    <VLoading v-else />
                </VButton>
            </div>
        </Form>

    </Dialog>
</template>
<script setup lang="ts">
import { BaseModel } from '@/common/utils/BaseModel';
import VButton from '@/components/VButton.vue';
import VLoading from '@/components/VLoading.vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Button, Dialog, useToast } from 'primevue';
import { Form } from 'vee-validate';
import { inject, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

const toast = useToast()
const { t } = useI18n()
const queryClient = useQueryClient()


const visible = defineModel()
const queryKey = inject<Ref<string>>('queryKey')
const model = inject<BaseModel>('model')
const isFormDataLoading = inject<Ref<boolean>>('isFormDataLoading')



const { mutate, isPending } = useMutation({
    mutationKey: [`${queryKey}-add`],
    mutationFn: () => model.create(),
    onSuccess: async () => {
        await queryClient.refetchQueries({
            queryKey: [queryKey]
        })
        toast.add({ severity: 'info', summary: t('global.operation_succeded'), detail: t('table.element_ok_added'), life: 5000 });
        visible.value = false
        model?.clearData()
    },
    onError: (error) => {
        toast.add({ severity: 'error', summary: t('global.operation_failed'), detail: t(error.message), life: 5000 });
    }
})

</script>