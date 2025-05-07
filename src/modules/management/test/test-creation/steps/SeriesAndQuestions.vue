<template>
    <StepPanel v-slot="{ activateCallback }" :value="`${props.value}`">

        <div flex gap-4 flex-col>
            <h3 my-0 text-slate-600 font-bold>Inserta las series y sus preguntas</h3>
            <h4 m-0 flex gap-4 items-center>
                Series<Button w-fit @click="showSerieDialog()" icon="pi pi-plus" />

            </h4>
            <section v-if="test.series.length > 0" bg-slate-200 flex flex-col gap-4 pa-3 rounded-xl overflow-hidden>
                <div w-full pb-4 overflow-auto>

                    <Steps class="!flex !gap-2" :readonly="false" flex-1 :model="getSeriesNames()"
                        v-model:activeStep="selectedSerieIndex" />
                </div>

                <div shadow-md rounded-lg pa-2 shadow-slate-500 bg-white>
                    <div flex mb-2 items-center justify-between>
                        <span font-bold truncate>{{ test.series[selectedSerieIndex].name }}</span>
                        <div flex>
                            <Button icon="pi pi-pencil" severity="secondary" variant="text"
                                @click="showSerieDialog(test.series[selectedSerieIndex])" />
                            <Button severity="danger" @click="deleteSerie()" icon="pi pi-trash" variant="text" />

                        </div>

                    </div>
                    <hr border-solid border-1 border-slate-400 />
                    <div shadow-md rounded-lg pa-2 shadow-slate-200 bg-white>
                        <h3 mt-0 flex gap-4 text-sm items-center>
                            Preguntas<Button w-fit @click="showQuestionDialog()" icon="pi pi-plus" />

                        </h3>
                        <section v-if="test.series[selectedSerieIndex].questions.length > 0" bg-slate-200 pa-3 grid
                            grid-cols-1 lg:grid-cols-2 gap-4 rounded-xl>

                            <div v-for="(question, questionIndex) in test.series[selectedSerieIndex].questions"
                                :key="questionIndex" shadow-md rounded-lg pa-2 shadow-slate-500 bg-white>
                                <div flex justify-between items-center>
                                    <div flex gap-2 items-center>
                                        <span truncate>{{ question.statement }}</span>
                                        <Tag :value="question.type?.name" severity="info" />
                                    </div>

                                    <div flex>
                                        <Button icon="pi pi-pencil" severity="secondary" variant="text"
                                            @click="showQuestionDialog(question)" />
                                        <Button severity="danger" @click="deleteQuestion(question.id_question)"
                                            icon="pi pi-trash" variant="text" />
                                    </div>
                                </div>
                                <div shadow-md rounded-lg pa-2 shadow-slate-200 bg-white>
                                    <h3 mt-0 flex gap-4 text-sm items-center>
                                        Respuestas<Button w-fit
                                            @click="showAnswerDialog(question.id_question, question.type?.id_type_question)"
                                            icon="pi pi-plus" />

                                    </h3>
                                    <section v-if="question.answers.length > 0" bg-slate-200 pa-3 flex flex-col gap-4
                                        rounded-xl>

                                        <div v-for="answer in question.answers" :key="answer.id_answer" shadow-md
                                            rounded-lg pa-2 shadow-slate-500 bg-white>
                                            <div flex justify-between items-center>

                                                <span truncate>{{ answer.text }}</span>


                                                <div flex>
                                                    <Button icon="pi pi-pencil" severity="secondary" variant="text"
                                                        @click="showAnswerDialog(question.id_question, question.type?.id_type_question, answer)" />
                                                    <Button severity="danger" @click="deleteAnswer(answer.id_answer)"
                                                        icon="pi pi-trash" variant="text" />
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
            <VConditions ref="condition" :conditions />

            <div class="flex pt-6 justify-between">
                <Button :label="$t('global.prev')" severity="secondary" icon="pi pi-arrow-left"
                    @click="activateCallback(`${parseInt(props.value) - 1}`)" />
                <Button :label="$t('global.next')" :disabled="canSubmit" icon="pi pi-arrow-right" iconPos="right"
                    @click="nextStep(activateCallback)" />
            </div>
        </div>
    </StepPanel>
    <SerieDialog ref="serieDialog" v-model="serie" :submit-function="saveSerie" :success-function="() => refetch()" />
    <QuestionDialog ref="questionDialog" v-model="question" :submit-function="saveQuestion"
        :success-function="() => refetch()" />
    <AnswerDialog ref="answerDialog" v-model="answer" :options="getItems()" :submit-function="saveAnswer"
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
import AnswerDialog from '../../modules/answer/AnswerDialog.vue';
import { Answer } from '../../modules/answer/answer.model';
import Steps from 'primevue/steps';
import VConditions from './VConditions.vue';
import { Tag } from 'primevue';

const props = defineProps({
    value: {
        type: String,
        required: true
    }
})

const serieDialog = ref()
const questionDialog = ref()
const answerDialog = ref()
const condition = ref()

const selectedSerieIndex = ref(0)
const selectedQuestionIndex = ref(-1)

const canSubmit = ref(false)

const conditions = ref([
    {
        text: 'Existe al menos una serie',
        satisfied: () => test.series.length > 0
    },
    {
        text: 'Existe al menos una pregunta en cada serie',
        satisfied: () => {
            if (test.series.length == 0)
                return false
            for (let i = 0; i < test.series.length; i++) {
                if (test.series[i].questions.length == 0)
                    return false
            }
            return true
        }
    },
    {
        text: 'Existe al menos una respuesta en cada pregunta',
        satisfied: () => {
            if (test.series.length == 0)
                return false
            for (let i = 0; i < test.series.length; i++) {
                if (test.series[i].questions.length == 0)
                    return false
                for (let j = 0; j < test.series[i].questions.length; j++) {
                    if (test.series[i].questions[j].answers.length == 0)
                        return false
                }
            }
            return true
        }
    }
]
)

const serie = ref(new Serie())

const question = ref(new Question())

const answer = ref(new Answer())


const testBuilder: Ref<TestBuilder> = inject('testBuilder')
const refetch: Function = inject('refetch')

const test: Test = testBuilder.value.getTest()

const { t } = useI18n()

const makeAction: Function = inject('makeAction')


const getItems = () => {
    const items = []
    if (test.equation && test.equation.equation) {
        items.push({ id_item: 62, name: 'correctas' }, { id_item: 63, name: 'incorrectas' })
    } else
        test.category.forEach(c => {
            items.push(...c.items)
        })
    return items
}




const showSerieDialog = (data?: Serie) => {
    if (data)
        serie.value.setData({ ...data })
    serieDialog.value.show()
}


const showQuestionDialog = (data?: Question) => {
    console.log(data)
    if (data)
        question.value.setData({ ...data })
    questionDialog.value.show()
}

const showAnswerDialog = (index: number, question_type: number | string, data?: Answer) => {
    if (data)
        answer.value.setData({ ...data })
    selectedQuestionIndex.value = index
    answerDialog.value.show(question_type)
}


const saveSerie = () => testBuilder.value.saveSerie(serie.value)

const deleteSerie = async () => await makeAction(() => testBuilder.value.deleteSerie(test.series[selectedSerieIndex.value].id_serie), () => { })

const saveQuestion = () => testBuilder.value.saveQuestion(question.value, test.series[selectedSerieIndex.value].id_serie)

const deleteQuestion = async (id: number) => await makeAction(() => testBuilder.value.deleteQuestion(id), () => { })

const saveAnswer = () => testBuilder.value.saveAnswer(answer.value, selectedQuestionIndex.value)

const deleteAnswer = async (id: number) => await makeAction(() => testBuilder.value.deleteAnswer(id), () => { })



const nextStep = (activateCallback: Function) => {
    try {
        if (condition.value.verify())
            activateCallback(`${parseInt(props.value) + 1}`)
        else throw new Error("existen condiciones no satisfechas")

    } catch (e: any) {
        useEvents().dispatch("error", {
            severity: "error",
            summary: "Error",
            detail: t(e.message),
            life: 3000,
        });
    }
}

const getSeriesNames = () => {
    let names = [];
    test.series.forEach((serie: { name: string }) => {
        names.push({ label: serie.name });
    });
    return names;
};



</script>