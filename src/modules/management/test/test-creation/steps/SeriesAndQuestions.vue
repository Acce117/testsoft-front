<template>
    <StepPanel v-slot="{ activateCallback }" value="3">

        <div flex gap-4 flex-col>
            <h3 my-0 text-slate-600 font-bold>Inserta las series y sus preguntas</h3>
            <h4 m-0 flex gap-4 items-center>
                Series<Button w-fit @click="showSerieDialog()" icon="pi pi-plus" />

            </h4>
            <section v-if="test.series.length > 0" bg-slate-200 flex flex-col gap-4 pa-3 rounded-xl>

                <div v-for="serie in test.series" :key="serie.id_serie" shadow-md rounded-lg pa-2 shadow-slate-500
                    bg-white>
                    <div flex mb-2 items-center justify-between>
                        <span font-bold>{{ serie.name }}</span>
                        <div flex gap-2>
                            <Button icon="pi pi-eye" severity="secondary" @click="showSerieDialog(serie)" />
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
                                <div shadow-md rounded-lg pa-2 shadow-slate-200 bg-white>
                                    <h3 mt-0 flex gap-4 text-sm items-center>
                                        Respuestas<Button w-fit @click="showAnswerDialog(serie.id_serie)"
                                            icon="pi pi-plus" />

                                    </h3>
                                    <section v-if="question.answers.length > 0" bg-slate-200 pa-3 flex flex-col gap-4
                                        rounded-xl>

                                        <div v-for="answer in question.answer" :key="answer.id_answer" shadow-md
                                            rounded-lg pa-2 shadow-slate-500 bg-white>
                                            <div flex justify-between items-center>

                                                <span>{{ answer.text }}</span>


                                                <div flex gap-2>
                                                    <Button icon="pi pi-eye" severity="secondary" />
                                                    <Button severity="danger"
                                                        @click="deleteQuestion(question.id_question)"
                                                        icon="pi pi-minus" />
                                                </div>
                                            </div>


                                        </div>
                                    </section>
                                    <span v-else>No existen respuestas</span>

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
    <SerieDialog ref="serieDialog" v-model="serie" :submit-function="createSerie" :success-function="() => refetch()" />
    <QuestionDialog ref="questionDialog" v-model="question" :question :submit-function="createQuestion"
        :success-function="() => refetch()" />


</template>
<script setup lang="ts">
import type { Test } from '@/modules/management/test/models/test.model';
import Button from 'primevue/button';
import StepPanel from 'primevue/steppanel';
import { inject, ref, type Ref, } from 'vue';
import { Serie } from '../../modules/serie/serie.model';
import useEvents from '@/common/utils/useEvents';
import { useI18n } from 'vue-i18n';
import type { TestBuilder } from '../../classes/TestBuilder';
import { Question } from '../../modules/question/question.model';
import SerieDialog from '../../modules/serie/SerieDialog.vue';
import QuestionDialog from '../../modules/question/QuestionDialog.vue';

const serieDialog = ref()
const questionDialog = ref()

const testBuilder: Ref<TestBuilder> = inject('testBuilder')
const refetch: Function = inject('refetch')

const test: Test = testBuilder.value.getTest()

const { t } = useI18n()

const makeAction: Function = inject('makeAction')


const selectedSerieIndex = ref(-1)

const serie = ref(new Serie({ name: 'juan' }))

const question = ref(new Question())

console.log(question)


const showSerieDialog = (data?:Serie) => {
    if(data)
        serie.value.setData({...data})
    serieDialog.value.show()
}


const showQuestionDialog = (index: number) => {
    selectedSerieIndex.value = index

    questionDialog.value.show()
}


const createSerie = () => testBuilder.value.saveSerie(serie.value)

const deleteSerie = async (id: number) => await makeAction(testBuilder.value.deleteSerie(id), () => { })

const createQuestion = () => testBuilder.value.saveQuestion(question.value, selectedSerieIndex.value)

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