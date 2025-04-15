<template>
    <StepPanel v-slot="{ activateCallback }" :value="`${props.value}`">
        {{ test }}
        <div flex gap-4 flex-col>
            <h3 my-0 text-slate-600 font-bold>Inserta las categorías y sus elementos</h3>
            <h4 m-0 flex gap-4 items-center>
                Categorías<Button w-fit @click="showCategoryDialog()" icon="pi pi-plus" />

            </h4>
            <section v-if="test.category.length > 0" bg-slate-200 flex flex-col gap-4 pa-3 rounded-xl overflow-hidden>
                <div w-full pb-4 overflow-auto>
                    <Steps class="!flex !gap-2" :readonly="false" flex-1 :model="getCategoriesNames()"
                        v-model:activeStep="selectedCategoryIndex" />
                </div>


                <div shadow-md rounded-lg pa-2 shadow-slate-500 bg-white>
                    <div flex mb-2 items-center justify-between>
                        <span font-bold>{{ test.category[selectedCategoryIndex].name }}</span>
                        <div flex >
                            <Button icon="pi pi-pencil" severity="secondary" variant="text"
                                @click="showCategoryDialog(test.category[selectedCategoryIndex])" />
                            <Button severity="danger" variant="text"  @click="deleteCategory()" icon="pi pi-trash" />

                        </div>

                    </div>
                    <hr border-solid border-1 border-slate-400 />
                    <div shadow-md rounded-lg pa-2 shadow-slate-200 bg-white>
                        <h3 mt-0 flex gap-4 text-sm items-center>
                            Elementos<Button w-fit @click="showItemDialog()" icon="pi pi-plus" />

                        </h3>
                        <section v-if="test.category[selectedCategoryIndex].items.length > 0" bg-slate-200 pa-3 flex
                            flex-col gap-4 rounded-xl>

                            <div v-for="item in test.category[selectedCategoryIndex].items" :key="item.id_item"
                                shadow-md rounded-lg pa-2 shadow-slate-500 bg-white>
                                <div flex justify-between items-center>

                                    <span>{{ item.name }}</span>


                                    <div flex > 
                                        <Button icon="pi pi-pencil" severity="secondary" @click="showItemDialog(item)" variant="text" />
                                        <Button severity="danger" @click="deleteItem(item.id_item)"
                                            icon="pi pi-trash" variant="text" />
                                    </div>
                                </div>
                                <div shadow-md rounded-lg pa-2 shadow-slate-200 bg-white>
                                    <h3 mt-0 flex gap-4 text-sm items-center>
                                        Rangos<Button w-fit @click="showRangeDialog(item.id_item)" icon="pi pi-plus" />

                                    </h3>
                                    <section v-if="item.ranges && item.ranges.length > 0" bg-slate-200 pa-3 flex
                                        flex-col gap-4 rounded-xl>

                                        <div v-for="range in item.ranges" :key="range.id_range" shadow-md rounded-lg
                                            pa-2 shadow-slate-500 bg-white>
                                            <div flex justify-between items-center>

                                                <span>{{ range.indicator }} (de {{ range.min_val }} a {{ range.max_val
                                                    }})</span>

                                                <div flex >
                                                    <Button icon="pi pi-pencil" severity="secondary" variant="text"
                                                        @click="showRangeDialog(item.id_item, range)" />
                                                    <Button severity="danger" @click="deleteRange(range.id_range)" variant="text"
                                                        icon="pi pi-trash" />
                                                </div>
                                            </div>


                                        </div>
                                    </section>
                                    <span v-else>No existen rangos</span>

                                </div>
                            </div>
                        </section>
                        <span v-else>No existen elementos</span>

                    </div>
                </div>
            </section>
            <span v-else>No existen categorías</span>


            <VConditions ref="condition" :conditions />


            <div class="flex pt-6 justify-between">
                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextStep(activateCallback)" />
            </div>
        </div>
    </StepPanel>
    <CategoryDialog v-model="category" :submit-function="saveCategory" ref="categoryDialog"
        :success-function="() => refetch()" />

    <ItemDialog v-model="item" :submit-function="saveItem" ref="itemDialog" :success-function="() => refetch()" />
    <RangeDialog v-model="range" :submit-function="saveRange" ref="rangeDialog" :success-function="() => refetch()" />

</template>
<script setup lang="ts">
import Button from 'primevue/button';
import StepPanel from 'primevue/steppanel';
import { inject, ref, type Ref, } from 'vue';

import useEvents from '@/common/utils/useEvents';
import { useI18n } from 'vue-i18n';
import type { TestBuilder } from '../../classes/TestBuilder';
import { Category } from '../../modules/category/category.model';
import { Item } from '../../modules/item/item.model';
import type { Test } from '../../models/test.model';
import CategoryDialog from '../../modules/category/CategoryDialog.vue';
import ItemDialog from '../../modules/item/ItemDialog.vue';
import { Range } from '../../modules/range/range.model';
import Steps from 'primevue/steps';
import RangeDialog from '../../modules/range/RangeDialog.vue';
import VConditions from './VConditions.vue';
const props = defineProps({
    value: {
        type: String,
        required: true
    }
})

const { t } = useI18n()
const categoryDialog = ref()
const itemDialog = ref()
const rangeDialog = ref()
const condition = ref()



const category = ref(new Category())
const item = ref(new Item())
const range = ref(new Range())


const testBuilder: Ref<TestBuilder> = inject('testBuilder')
const refetch: Function = inject('refetch')
const makeAction: Function = inject('makeAction')


const selectedCategoryIndex = ref(0)
const selectedItemIndex = ref(-1)


const conditions = ref([
    {
        text: 'Existe al menos una categoría',
        satisfied: () => test.category.length > 0
    },
    {
        text: 'Existe al menos un elemento en cada categoría',
        satisfied: () => {
            if (test.category.length == 0)
                return false
            for (let i = 0; i < test.category.length; i++) {
                if (test.category[i].items.length == 0)
                    return false
            }
            return true
        }
    },
    {
        text: 'Cada valor máximo de un rango es menor que el valor mínimo del siguiente',
        satisfied: () => {
            if (test.category.length == 0)
                return false
            for (let i = 0; i < test.category.length; i++) {
                let category = test.category[i]
                if (category.items.length == 0)
                    return false
                for (let j = 0; j < category.items.length; j++) {
                    let item = category.items[j]

                    if (item.ranges)
                        for (let k = 0; k < item.ranges.length; k++) {
                            let range = item.ranges[k]
                            let nextRange;
                            if (item.ranges[k + 1]) {
                                nextRange = item.ranges[k + 1]
                                if (range.max_val > nextRange.min_val)
                                    return false
                            }

                        }
                }
            }
            return true
        }
    }
]
)

const test: Test = testBuilder.value.getTest()

const showCategoryDialog = (data?: Category) => {
    if (data)
        category.value.setData({ ...data })
    categoryDialog.value.show()
}



const showItemDialog = (data?: Item) => {
    if (data)
        item.value.setData({ ...data })
    itemDialog.value.show()
}

const showRangeDialog = (index: number, data?: Range) => {
    if (data)
        range.value.setData({ ...data })
    selectedItemIndex.value = index
    rangeDialog.value.show()
}




const saveCategory = () => testBuilder.value.saveCategory(category.value)

const deleteCategory = async () =>  makeAction(()=> testBuilder.value.deleteCategory(test.category[selectedCategoryIndex.value].id_category), () => { })

const saveItem = () => testBuilder.value.saveItem(item.value, test.category[selectedCategoryIndex.value].id_category)

const deleteItem = async (id: number) =>  makeAction(()=>testBuilder.value.deleteItem(id), () => { })

const saveRange = () => testBuilder.value.saveRange(range.value, selectedItemIndex.value)

const deleteRange = async (id: number) =>  makeAction(()=>testBuilder.value.deleteRange(id), () => { })




const nextStep = (activateCallback: Function) => {
    try {
        if (condition.value.verify())
            activateCallback('3')
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

const getCategoriesNames = () => {
    let names = Array();
    test.category.forEach((category: { name: string }) => {
        names.push({ label: category.name });
    });
    return names;
};

</script>