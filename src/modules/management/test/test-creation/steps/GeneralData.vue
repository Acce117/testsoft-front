<template>
    <StepPanel v-slot="{ activateCallback }" value="1">
        <Form @submit="setGeneralData(activateCallback)" :validation-schema="test.getSchema()">

            <div flex gap-6 flex-col>
                <h3 my-0 text-slate-600 font-bold>Inserta los datos generales</h3>

                <VInput v-model="test.name" name="name" label="Nombre" />
                <VInput v-model="test.description" rows="3" textarea name="description" label="Descripción" />
                <VInput v-model="test.time_duration" min="0" number name="time_duration"
                    label="Tiempo de duración (Minutos)" />
                <VInput v-model="test.recurring_time" min="0" number name="recurring_time"
                    label="Tiempo para poder repetir el test (Años)" />


                <VYesNoQuestion  v-model="test.navigable"
                    label="¿Es posible navegar por las diferentes series del test?" name="navigable" />
                <VYesNoQuestion  v-model="test.completed"
                    label="¿Es necesario chequear el completamiento para que el procesamiento del test sea correcto?"
                    name="completed" />
                <VSelect :disabled="forUpdate" @update:model-value="(value) => cleanEquationField(value)"
                    v-model="test.fk_id_type_test" optionId="id_type_test" :defaultValue="test.type_psi_test"
                    name="fk_id_type_test" label="Tipo de Test" :options="testTypes" optionLabel="type_test_name" />
                <VSelect v-model="test.language" name="language"
                    :defaultValue="languages.filter((l) => l.id == test.language)[0]" label="Idioma"
                    :options="languages" optionLabel="name" />

                <VInput v-if="test.fk_id_type_test == 1" v-model="test.equation.equation" name="equation"
                    label="Formula" />
                <div class="flex pt-6 justify-end">
                    <Button :disabled="isPending" label="Next" icon="pi pi-arrow-right" iconPos="right" type="submit" />
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
import { inject, type Ref } from 'vue';
import { useTestTypes } from '../../modules/test-type/useTestTypes';
import type { Test } from '@/modules/management/test/models/test.model';
import type { TestBuilder } from '../../classes/TestBuilder';
import { Form } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import router from '@/router';

const forUpdate = router.currentRoute.value.name?.toString().includes('update')

const languages = [{
    name: 'Español', id: 'es'
},
{
    name: 'Inglés', id: 'en'
}]



const { t } = useI18n()
const loading = inject('loading')
const makeAction: Function = inject('makeAction')


const testBuilder: Ref<TestBuilder> = inject('testBuilder')
const test: Test = testBuilder.value.test
const { testTypes, isPending } = useTestTypes()

const cleanEquationField = (value: number | string) => {
    if (value == 2) {
        test.equation?.clearData()
    }
}


const setGeneralData = async (activateCallback: Function) => await makeAction(async () => await testBuilder.value.setGeneralData(), () => {
    activateCallback('2')
})

</script>