<template>
    <StepPanel v-slot="{ activateCallback }" value="3">

        <div flex gap-4 flex-col>
            <h3 my-0 text-slate-600 font-bold>Inserta las series y sus preguntas</h3>
            <h4 m-0 flex gap-4 items-center>
                Series<Button w-fit @click="visibleSerieDialog = true" icon="pi pi-plus" />

            </h4>
            <section v-if="test.series.length > 0" bg-slate-200 flex flex-col gap-4 pa-3 rounded-xl>

                <div v-for="serie in test.series" :key="serie.id_serie" shadow-md rounded-lg pa-2 shadow-slate-500
                    bg-white>
                    <div flex mb-2 items-center justify-between>
                        <span font-bold>{{ serie.name }}</span>
                        <div flex gap-2>
                            <Button icon="pi pi-eye" severity="secondary" />
                            <Button severity="danger" @click="deleteSerie(serie.id_serie)" icon="pi pi-minus" />

                        </div>

                    </div>
                    <hr border-solid border-1 border-slate-400 />
                    <div shadow-md rounded-lg pa-2 shadow-slate-200 bg-white>
                        <h3 mt-0 flex gap-4 text-sm items-center>
                            Preguntas<Button w-fit @click="showQuestionDialog(serie.id_serie)" icon="pi pi-plus" />

                        </h3>
                        <section v-if="serie.questions.length > 0" bg-slate-200 pa-3 flex flex-col gap-4 rounded-xl>

                            <div v-for="(question, questionIndex) in serie.questions" :key="questionIndex" shadow-md
                                rounded-lg pa-2 shadow-slate-500 bg-white>
                                <div flex justify-between items-center>

                                    <span>{{ question.statement }}</span>


                                    <div flex gap-2>
                                        <Button icon="pi pi-eye" severity="secondary" />
                                        <Button severity="danger" @click="deleteQuestion(question.id_question)"
                                            icon="pi pi-minus" />
                                    </div>
                                </div>


                            </div>
                        </section>
                        <span v-else>No existen preguntas</span>

                    </div>
                </div>
            </section>
            <span v-else>No existen series</span>




            <div class="flex pt-6 justify-between">
                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('2')" />
                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextStep(activateCallback)" />
            </div>
        </div>
    </StepPanel>
    <Dialog v-model:visible="visibleSerieDialog" modal :header="$t('table.update')"
        class="w-4/5 max-w-50rem min-w-25rem">
        <Form @submit="createSerie" :validation-schema="serie.getSchema()">
            <div class="dialog-form">

                <VInput v-model="serie.name" name="name" label="Nombre" />
                <VInput v-model="serie.description" rows="3" textarea name="description" label="Descripción" />
                <VInput v-model="serie.time_serie_duration" min="0" number name="time_serie_duration"
                    label="Tiempo de duración (Minutos)" />
            </div>

            <div class="dialog-footer">
                <Button type="button" :label="$t('table.cancel')" severity="secondary"
                    @click="visibleSerieDialog = false"></Button>
                <Button type="submit" :label="$t('table.save')"></Button>
            </div>
        </Form>
    </Dialog>
    <Dialog v-model:visible="visibleQuestionDialog" modal :header="$t('table.update')"
        class="w-4/5 max-w-50rem min-w-25rem">
        <Form @submit="createQuestion" :validation-schema="question.getSchema()">
            <div class="dialog-form">

                <VInput v-model="question.statement" textarea name="statement" label="Enunciado" />
                <VSelect v-model="question.fk_id_type_question" optionId="id_type_question" name="fk_id_type_question"
                    label="Tipo de Pregunta" :options="questionTypes" optionLabel="name" />
            </div>

            <div class="dialog-footer">
                <Button type="button" :label="$t('table.cancel')" severity="secondary"
                    @click="visibleQuestionDialog = false"></Button>
                <Button type="submit" :label="$t('table.save')"></Button>
            </div>
        </Form>
    </Dialog> 
</template>
<script setup lang="ts">
import VInput from '@/components/VInput.vue';
import type { Test } from '@/modules/management/test/models/test.model';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import StepPanel from 'primevue/steppanel';
import { Form } from 'vee-validate';
import { inject, ref, type Ref, } from 'vue';
import { Serie } from '../../modules/serie/serie.model';
import { Question } from '../../models/question.model';
import VSelect from '@/components/VSelect.vue';
import { useQuestionTypes } from '../../modules/question-type/useQuestionTypes';
import useEvents from '@/common/utils/useEvents';
import { useI18n } from 'vue-i18n';
import type { TestBuilder } from '../../classes/TestBuilder';


const testBuilder: Ref<TestBuilder> = inject('testBuilder')
const test: Test = testBuilder.value.getTest()

const { t } = useI18n()

const makeAction: Function = inject('makeAction')

const visibleSerieDialog = ref(false)
const visibleQuestionDialog = ref(false)

const selectedSerieIndex = ref(-1)

const { questionTypes, isPending } = useQuestionTypes()

const serie = ref(new Serie())
const question = ref(new Question())

const showQuestionDialog = (index: number) => {
    selectedSerieIndex.value = index
    visibleQuestionDialog.value = true
}


const createSerie = async () => await makeAction(testBuilder.value.createSerie(serie.value), () => {
    visibleSerieDialog.value = false
    serie.value.clearData()
})

const deleteSerie = async (id: number) => await makeAction(testBuilder.value.deleteSerie(id), () => { })

const createQuestion = async () => await makeAction(testBuilder.value.createQuestion({ ...question.value, image: 0 }, selectedSerieIndex.value), () => {
    visibleQuestionDialog.value = false
    question.value.clearData()
})

const deleteQuestion = async (id: number) => await makeAction(testBuilder.value.deleteQuestion(id), () => { })


const nextStep = (activateCallback: Function) => {
    try {
        if (test.series.length == 0) {
            throw new Error("series.lengthmayor que 0")
        }
        test.series.forEach(serie => {
            if (serie.questions.length == 0)
                throw new Error("Todas las series deben poseer al menos una pregunta")
        });
        activateCallback('4')

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