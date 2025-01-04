<template>
    <FormDialog :model :submit-function :success-function ref="dialog">
        <template #form>
            <VInput v-model="model.text" name="text" label="Texto" />
        </template>
    </FormDialog>
</template>
<script setup lang="ts">
import VInput from '@/components/VInput.vue';
import FormDialog from '@/components/FormDialog.vue';
import { ref, type Ref } from 'vue';

const props = defineProps({
    submitFunction: {
        type: Function,
        required: true
    },
    successFunction: {
        type: Function
    }
})
const model: Ref<Answer> = defineModel()

const dialog = ref()

const show = () => {
    dialog.value.show()
}
defineExpose({ show })
</script>