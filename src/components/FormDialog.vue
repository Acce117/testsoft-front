<template>
    <Dialog @after-hide="props.model.clearData()" v-model:visible="visible" modal :header="$t('table.update')" class="w-4/5 max-w-50rem min-w-25rem">
        <Form @submit="onSubmit" :validation-schema="model.getSchema()">
            <div class="dialog-form">
                <slot name="form">
                </slot>
            </div>

            <div class="dialog-footer">
                <Button type="button" :label="$t('table.cancel')" severity="secondary"
                    @click="visible = false"></Button>
                <VButton w-8rem :disabled="isRequestLoading || isDataLoading" type="submit">
                    <span v-if="!isRequestLoading || isDataLoading">{{ $t("table.save") }} </span>
                    <VLoading v-else />
                </VButton>
            </div>
        </Form>
    </Dialog>

</template>
<script setup lang="ts">
import { BaseModel } from '@/common/utils/BaseModel';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { Form } from 'vee-validate';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import VButton from './VButton.vue';
import handlePromise from '@/common/utils/handlePromise';

const { t } = useI18n()

const isRequestLoading = ref(false)

const props = defineProps({
    model: {
        type: BaseModel,
        required: true
    },
    submitFunction: {
        type: Function,
        required: true
    },
    successFunction: {
        type: Function
    },
    isDataLoading: {
        type: Boolean
    },
    forUpdate: {
        type: Boolean
    },


})
const visible = ref(false)


const show = () => {
    // if (!props.forUpdate)
    //     props.model.clearData()
    visible.value = true
}



const onSubmit = async () => {
    handlePromise(props.submitFunction, isRequestLoading, () => {
        if (props.successFunction) props.successFunction()
        visible.value = false
        props.model.clearData()
    })
}

defineExpose({ show })

</script>