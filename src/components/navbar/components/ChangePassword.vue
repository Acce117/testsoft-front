<template>

    <Dialog  v-model:visible="visible" @after-hide="cleanForm" modal :header="$t('change_password.title')" class="w-4/5 max-w-50rem min-w-25rem">

        <span>{{ $t('change_password.subtitle') }}</span>
        <Form @submit="changePassword" :validation-schema="schema">
            <div class="dialog-form">

                <VInput name="password" id="password-input" :max="8" type="password" v-model="credentials.password"
                    label="change_password.password" />
                <VInput name="new_password" id="password-input" :max="8" type="password" v-model="credentials.new_password"
                    label="change_password.new_password" />

            </div>

            <div class="dialog-footer">
                <Button type="button" :label="$t('global.cancel')" severity="secondary"
                    @click="visible = false"></Button>
                <VButton w-8rem :disabled="isAddPending" type="submit">
                    <span v-if="!isAddPending">{{ $t("global.save") }} </span>
                    <VLoading v-else />
                </VButton>
            </div>
        </Form>

    </Dialog>
</template>
<script setup lang="ts">
import { sendRequest } from '@/common/utils/sendRequest';
import VButton from '@/components/VButton.vue';
import VInput from '@/components/VInput.vue';
import VLoading from '@/components/VLoading.vue';
import { useMutation } from '@tanstack/vue-query';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { useToast } from 'primevue/usetoast';
import { Form } from 'vee-validate';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { object, string, ref as yupRef } from 'yup';
const toast = useToast()
const visible = defineModel()
const { t } = useI18n()

const schema = object({
    password: string().required().min(8),
    new_password: string().required().oneOf([yupRef('password'), null], 'Las contraseñas no coinciden'),
});

const credentials = ref({
    new_password: "",
    password: "",
});
const cleanForm = ()=>{
    credentials.value.new_password=''
    credentials.value.password=''
}

const { mutate: changePassword, isPending: isAddPending } = useMutation({
    mutationKey: [`change-password`],
    mutationFn: (value) => sendRequest({
        url: `${import.meta.env.VITE_API_PATH}/change-password`,
        body: value,
    }),
    onSuccess: async () => {
        toast.add({ severity: 'info', summary: t('table.confirmation'), detail: t('table.operation_completed'), life: 5000 });
        visible.value = false

    },
    onError: (error) => {
        toast.add({ severity: 'error', summary: t('table.something_wrong'), detail: t(error.message), life: 5000 });
    }
})


</script>