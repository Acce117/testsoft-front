<template>
    <StepPanel v-slot="{ activateCallback }" value="2">
        <Form @submit="setEquation(activateCallback)" :validation-schema="object()">
            <div flex gap-6 flex-col>
                <h3 my-0 text-slate-600 font-bold>Inserta la ecuación para el cálculo de los resultados</h3>



                <VInput v-if="test.fk_id_type_test == 1" @blur="renderSteps" v-model="equation"
                    name="equation" label="Formula" />
                <div class="flex pt-6 justify-end">
                    <Button :disabled="loading" label="Next" icon="pi pi-arrow-right" iconPos="right" type="submit" />
                </div>




            </div>
        </Form>
    </StepPanel>

</template>


<script setup lang="ts">
import VInput from '@/components/VInput.vue';

import Button from 'primevue/button';
import StepPanel from 'primevue/steppanel';
import { computed, inject, ref, type Ref } from 'vue';
import type { Test } from '@/modules/management/test/models/test.model';
import type { TestBuilder } from '../../classes/TestBuilder';
import { Form } from 'vee-validate';
import { useI18n } from 'vue-i18n';

import { object } from 'yup';

const props = defineProps({
    value: {
        type: String,
        required: true
    },

})



const equation = ref()


const { t } = useI18n()
const loading = inject('loading')
const renderSteps = inject('renderSteps')

const makeAction: Function = inject('makeAction')


const testBuilder: Ref<TestBuilder> = inject('testBuilder')
const test: Test = testBuilder.value.test



const setEquation = async (activateCallback: Function) => {

    await makeAction(async () => await testBuilder.value.setEquation(equation.value), () => {
        activateCallback(`${parseInt(props.value) + 1}`)
    })
}



</script>