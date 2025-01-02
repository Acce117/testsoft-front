<template>
    <StepPanel v-slot="{ activateCallback }" value="4">
        <Form @submit="setParameterDisplayResult(activateCallback)"
            :validation-schema="test.display_parameters.getSchema()">

            <div flex gap-6 flex-col>
                <h3 my-0 text-slate-600 font-bold>Configure la visualización de resultados</h3>




                <VYesNoQuestion v-model="test.display_parameters.global_result"
                    label="¿Es necesario mostrar el resultado global del test?" name="global_result" />
                <VRadioButton label="Los elementos que procesa el test se deben mostrar:" v-model="parameter_order"
                    name="parameter_order"
                    :options="['Ordenados por su valor', 'Ordenados por su valor agrupados por Categoría']" />

                <VYesNoQuestion v-model="test.display_parameters.tops_values" @update:model-value="resetCounts($value)"
                    label="¿Mostrar los elementos con valores máximos y mínimos?" name="tops_values" />
                <div v-if="test.display_parameters.tops_values" flex gap-6 flex-col max-w-15rem>
                    <VInput v-model="test.display_parameters.count_max" min="0" number name="count_max"
                        label="Cantidad de máximos" />
                    <VInput v-model="test.display_parameters.count_min" min="0" number name="count_min"
                        label="Cantidad de mínimos" />
                </div>



                <div class="flex pt-6 justify-between">
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('3')" />
                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" type="submit" />
                </div>

            </div>
        </Form>

    </StepPanel>


</template>
<script setup lang="ts">

import VYesNoQuestion from '@/components/VYesNoQuestion.vue';
import Button from 'primevue/button';
import StepPanel from 'primevue/steppanel';
import { inject, ref, type Ref } from 'vue';
import VRadioButton from '@/components/VRadioButton.vue';
import { Form } from 'vee-validate';
import VInput from '@/components/VInput.vue';
import type { TestBuilder } from '../../classes/TestBuilder';
const parameter_order = ref('')
const testBuilder: Ref<TestBuilder> = inject('testBuilder')
const test = ref(testBuilder.value.getTest())

if (test.value.display_parameters.getID())
    parameter_order.value = test.value.display_parameters.all_element_value ? 'Ordenados por su valor' : 'Ordenados por su valor agrupados por Categoría'

const setParameterDisplayResult = (activateCallback: Function) => {
    if (parameter_order.value === 'Ordenados por su valor') {
        test.value.all_element_value = true
        test.value.display_parameters.element_by_category = false
    } else {
        test.value.display_parameters.all_element_value = false
        test.value.display_parameters.element_by_category = true
    }
    if (test.value.display_parameters.getID())
        testBuilder.value.updateParameterDisplayResult()
    else testBuilder.value.createParameterDisplayResult()

    //activateCallback('5')
}

const resetCounts = (topsValuesFlag: boolean) => {
    if (!topsValuesFlag) {
        test.value.display_parameters.count_max = 0
        test.value.display_parameters.count_min = 0
    }

}

</script>