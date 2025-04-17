<template>
    <StepPanel v-slot="{ activateCallback }" :value="`${props.value}`">
        <Form v-if="test.display_parameters" @submit="setParameterDisplayResult(activateCallback)"
            :validation-schema="test.display_parameters.getSchema()">
            {{ test }}

            <div flex gap-6 flex-col>
                <h3 my-0 text-slate-600 font-bold>Configure la visualización de resultados</h3>

                <VYesNoQuestion :canValidate :default="test.display_parameters.global_result"
                    v-model="test.display_parameters.global_result"
                    label="¿Es necesario mostrar el resultado global del test?" name="global_result" />
                <VYesNoQuestion :canValidate :default="test.display_parameters.all_element_value"
                    label="Los elementos que procesa el test se deben mostrar:"
                    v-model="test.display_parameters.all_element_value" name="all_element_value"
                    yesOption="Ordenados por su valor" noOption="Ordenados por su valor agrupados por Categoría" />

                <VYesNoQuestion :canValidate :default="test.display_parameters.tops_values"
                    v-model="test.display_parameters.tops_values" @update:model-value="(value) => resetCounts(value)"
                    label="¿Mostrar los elementos con valores máximos y mínimos?" name="tops_values" />
                <div v-if="test.display_parameters.tops_values" flex gap-6 flex-col max-w-15rem>
                    <VInput v-model="test.display_parameters.count_max" min="0" number name="count_max"
                        label="Cantidad de máximos" />
                    <VInput v-model="test.display_parameters.count_min" min="0" number name="count_min"
                        label="Cantidad de mínimos" />
                </div>


                <div class="flex pt-6 justify-between">
                    <Button :label="$t('global.prev')" severity="secondary" icon="pi pi-arrow-left"
                        @click="activateCallback(`${parseInt(props.value) - 1}`)" />
                    <Button :label="$t('global.next')" @click="() => canValidate = true" icon="pi pi-arrow-right"
                        iconPos="right" type="submit" />
                </div>

            </div>
        </Form>

    </StepPanel>


</template>
<script setup lang="ts">

import VYesNoQuestion from '@/components/VYesNoQuestion.vue';
import Button from 'primevue/button';
import StepPanel from 'primevue/steppanel';
import { inject, onMounted, ref, type Ref } from 'vue';
import { Form } from 'vee-validate';
import VInput from '@/components/VInput.vue';
import type { TestBuilder } from '../../classes/TestBuilder';

const props = defineProps({
    value: {
        type: String,
        required: true
    }
})
const testBuilder: Ref<TestBuilder> = inject('testBuilder')
const test = ref(testBuilder.value.getTest())

const canValidate = ref(false)

const showForm = ref(false)

const setParameterDisplayResult = async (activateCallback: (value: string) => void) => {
    canValidate.value = true
    test.value.display_parameters.element_by_category = !test.value.display_parameters.all_element_value
    await testBuilder.value.saveParameterDisplayResult()
    activateCallback(`${parseInt(props.value) + 1}`)
}

const resetCounts = (topsValuesFlag: boolean) => {
    console.log('lllll')
    if (!topsValuesFlag) {
        test.value.display_parameters.count_max = 0
        test.value.display_parameters.count_min = 0
    }

}

onMounted(() => {
    showForm.value = true
})

</script>