<template>
    <StepPanel v-slot="{ activateCallback }" value="1">
        <Form @submit="setGeneralData(activateCallback)" :validation-schema="test.getSchema()">
            {{ test }}
            <div flex gap-6 flex-col>
                <h3 my-0 text-slate-600 font-bold>Inserta los datos generales</h3>
                <InputsContainer>
                    <template #content>
                        <VInput class="flex-1" v-model="test.name" name="name" label="Nombre" />
                        <VSelect class="flex-1" v-model="test.language" name="language"
                            :defaultValue="languages.filter((l) => l.id == test.language)[0]" label="Idioma"
                            :options="languages" optionLabel="name" />
                        <VSelect class="flex-1" :disabled="forUpdate"
                            @update:model-value="changeSteps" v-model="test.fk_id_type_test"
                            optionId="id_type_test" :defaultValue="test.type_psi_test" name="fk_id_type_test"
                            label="Tipo de Test" :options="testTypes" optionLabel="type_test_name" />
                        <VInput class="flex-1" v-model="test.recurring_time" min="0" number name="recurring_time"
                            label="Tiempo para poder repetir el test (Años)"
                            tooltip="Indica el tiempo necesario para poder realizar el test nuevamente. Algunos test aplican esta característica para garantizar la validez de los resultados" />

                    </template>

                </InputsContainer>


                <VInput v-model="test.description" rows="3" textarea name="description" label="Descripción" />
                <InputsContainer>
                    <template #content>
                        <VYesNoQuestion class="flex-1" :disabled="forUpdate"
                            @update:model-value="(value) => { test.time_duration = value ? 1 : 0 }"
                            :default="test.navigable" v-model="test.navigable"
                            label="¿Es posible navegar por las diferentes series del test?" name="navigable" />


                        <VInput class="flex-1" v-if="test.navigable" v-model="test.time_duration" min="1" number
                            name="time_duration" label="Tiempo de duración del test (Minutos)" />

                        <VYesNoQuestion class="flex-1" v-model="test.completed" :default="test.completed"
                            label="¿Es necesario chequear el completamiento para que el procesamiento del test sea correcto?"
                            name="completed" />
                    </template>
                </InputsContainer>



                <div class="flex pt-6 justify-end">
                    <Button :disabled="isPending" :label="$t('global.next')" icon="pi pi-arrow-right" iconPos="right" type="submit" />
                </div>
            </div>
        </Form>
    </StepPanel>



</template>
<script setup lang="ts">
import VInput from '@/components/VInput.vue';
import VSelect from '@/components/VSelect.vue';
import VYesNoQuestion from '@/components/VYesNoQuestion.vue';
import Button from 'primevue/button';
import StepPanel from 'primevue/steppanel';
import {  inject, type Ref } from 'vue';
import { useTestTypes } from '../../modules/test-type/useTestTypes';
import type { Test } from '@/modules/management/test/models/test.model';
import type { TestBuilder } from '../../classes/TestBuilder';
import { Form } from 'vee-validate';
import { useI18n } from 'vue-i18n';

import InputsContainer from '@/components/InputsContainer.vue';

const props = defineProps({
    value: {
        type: String,
        required: true
    },
    forUpdate: {
        type: Boolean,
        default: false
    }
})


const languages = [{
    name: 'Español', id: 'es'
},
{
    name: 'Inglés', id: 'en'
}]



const { t } = useI18n()
const loading = inject('loading')
const renderSteps = inject('renderSteps')

const makeAction: Function = inject('makeAction')


const testBuilder: Ref<TestBuilder> = inject('testBuilder')
const test: Test = testBuilder.value.test
const { testTypes, isPending } = useTestTypes()

const changeSteps = ()=>{
    renderSteps()
}

const setGeneralData = async (activateCallback: Function) => {
    await makeAction(async () => await testBuilder.value.setGeneralData(), () => {
        console.log('asdsa')

        activateCallback(`${parseInt(props.value) + 1}`)
        console.log('asds222a')

    })
}



</script>