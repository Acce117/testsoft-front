<template>
    <StepPanel v-slot="{ activateCallback }" value="5">

        <div flex gap-4 flex-col>
            <h3 my-0 text-slate-600 font-bold>Configure la clasificación de resultados</h3>
            <h4 m-0 flex gap-4 items-center>
                Clasificaciones<Button w-fit @click="showClassificationDialog()" icon="pi pi-plus" />

            </h4>
            <section v-if="test.classifications.length > 0" bg-slate-200 flex flex-col gap-4 pa-3 rounded-xl>

                <div v-for="classification in test.classifications" :key="classification.id_classification" shadow-md
                    rounded-lg pa-2 shadow-slate-500 bg-white>
                    <div flex mb-2 items-center justify-between>
                        <span font-bold>{{ classification.name_classification }}</span>
                        <div flex gap-2>
                            <Button icon="pi pi-eye" severity="secondary"
                                @click="showClassificationDialog(classification)" />
                            <Button severity="danger" @click="deleteClassification(classification.id_classification)"
                                icon="pi pi-minus" />

                        </div>

                    </div>
                    <hr border-solid border-1 border-slate-400 />
                    <div shadow-md rounded-lg pa-2 shadow-slate-200 bg-white>
                        <h3 mt-0 flex gap-4 text-sm items-center>
                            Rangos<Button w-fit @click="showTestRangeDialog(classification.id_classification)"
                                icon="pi pi-plus" />

                        </h3>
                        <section v-if="classification.ranges.length > 0" bg-slate-200 pa-3 flex flex-col gap-4
                            rounded-xl>

                            <div v-for="test_range in classification.ranges" :key="test_range.id_test_range" shadow-md
                                rounded-lg pa-2 shadow-slate-500 bg-white>
                                <div flex justify-between items-center>

                                    <span>{{ test_range.indicator }}</span>


                                    <div flex gap-2>
                                        <Button icon="pi pi-eye" severity="secondary"
                                            @click="showTestRangeDialog(classification.id_classification, test_range)" />
                                        <Button severity="danger" @click="deleteTestRange(test_range.id_test_range)"
                                            icon="pi pi-minus" />
                                    </div>
                                </div>


                            </div>
                        </section>
                        <span v-else>No existen rangos</span>

                    </div>
                </div>
            </section>
            <span v-else>No existen clasificaciones</span>
            <div class="flex pt-6 justify-between">
                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('4')" />
                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextStep(activateCallback)" />
            </div>
        </div>
    </StepPanel>
    <ClassificationDialog ref="classificationDialog" v-model="classification" :submit-function="saveClassification"
        :success-function="() => refetch()" />
    <TestRangeDialog ref="testRangeDialog" v-model="testRange" :submit-function="saveTestRange"
        :success-function="() => refetch()" />



</template>
<script setup lang="ts">
import type { Test } from '@/modules/management/test/models/test.model';
import Button from 'primevue/button';
import StepPanel from 'primevue/steppanel';
import { inject, ref, type Ref, } from 'vue';
import { Classification } from '../../modules/classification/classification.model';
import useEvents from '@/common/utils/useEvents';
import { useI18n } from 'vue-i18n';
import type { TestBuilder } from '../../classes/TestBuilder';
import { TestRange } from '../../modules/test_range/test_range.model';
import ClassificationDialog from '../../modules/classification/ClassificationDialog.vue';
import TestRangeDialog from '../../modules/test_range/TestRangeDialog.vue';

const classificationDialog = ref()
const testRangeDialog = ref()
const selectedClassificationIndex = ref(-1)

const classification = ref(new Classification())

const testRange = ref(new TestRange())



const testBuilder: Ref<TestBuilder> = inject('testBuilder')
const refetch: Function = inject('refetch')

const test: Test = testBuilder.value.getTest()

const { t } = useI18n()

const makeAction: Function = inject('makeAction')







const showClassificationDialog = (data?: Classification) => {
    if (data)
        classification.value.setData({ ...data })
    classificationDialog.value.show()
}


const showTestRangeDialog = (index: number, data?: TestRange) => {
    if (data)
        testRange.value.setData({ ...data })
    selectedClassificationIndex.value = index
    testRangeDialog.value.show()
}



const saveClassification = () => testBuilder.value.saveClassification(classification.value)

const deleteClassification = async (id: number) => await makeAction(testBuilder.value.deleteClassification(id), () => { })

const saveTestRange = () => testBuilder.value.saveTestRange(testRange.value, selectedClassificationIndex.value)

const deleteTestRange = async (id: number) => await makeAction(testBuilder.value.deleteTestRange(id), () => { })





const nextStep = (activateCallback: Function) => {
    try {
        if (test.classifications.length == 0) {
            throw new Error("classifications.lengthmayor que 0")
        }
        test.classifications.forEach(classification => {
            if (classification.ranges.length == 0)
                throw new Error("Todas las clasificaciones deben poseer al menos un rango")
        });
        activateCallback('6')

    } catch (e: any) {
        useEvents().dispatch("error", {
            severity: "error",
            summary: "Error",
            detail: t(e.message),
            life: 3000,
        });
    }
}



</script>