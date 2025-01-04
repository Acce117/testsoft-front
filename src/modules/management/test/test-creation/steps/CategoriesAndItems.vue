<template>
    <StepPanel v-slot="{ activateCallback }" value="2">
        <div flex gap-4 flex-col>
            <h3 my-0 text-slate-600 font-bold>Inserta las categorías y sus elementos</h3>
            <h4 m-0 flex gap-4 items-center>
                Categorías<Button w-fit @click="showCategoryDialog" icon="pi pi-plus" />

            </h4>
            {{ test.category }}
            <section v-if="test.category.length > 0" bg-slate-200 flex flex-col gap-4 pa-3 rounded-xl>

                <div v-for="category in test.category" :key="category.id_category" shadow-md rounded-lg pa-2
                    shadow-slate-500 bg-white>
                    <div flex mb-2 items-center justify-between>
                        <span font-bold>{{ category.name }}</span>
                        <div flex gap-2>
                            <Button icon="pi pi-eye" severity="secondary" />
                            <Button severity="danger" @click="deleteCategory(category.id_category)" icon="pi pi-minus" />

                        </div>

                    </div>
                    <hr border-solid border-1 border-slate-400 />
                    <div shadow-md rounded-lg pa-2 shadow-slate-200 bg-white>
                        <h3 mt-0 flex gap-4 text-sm items-center>
                            Elementos<Button w-fit @click="showItemDialog(category.id_category)" icon="pi pi-plus" />

                        </h3>
                         <section v-if="category.items.length > 0" bg-slate-200 pa-3 flex flex-col gap-4 rounded-xl>

                            <div v-for="item in category.items" :key="item.id_item" shadow-md rounded-lg pa-2
                                shadow-slate-500 bg-white>
                                <div flex justify-between items-center>

                                    <span>{{ item.name }}</span>


                                    <div flex gap-2>
                                        <Button icon="pi pi-eye" severity="secondary" />
                                        <Button severity="danger" @click="deleteItem(category.id_category)"
                                            icon="pi pi-minus" />
                                    </div>
                                </div>


                            </div>
                        </section>
                        <span v-else>No existen elementos</span> 

                    </div>
                </div>
            </section>
            <span v-else>No existen categorías</span>




            <div class="flex pt-6 justify-between">
                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
                <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                    @click="nextStep(activateCallback)" />
            </div>
        </div>
    </StepPanel>
    <CategoryDialog v-model="category" :submit-function="createCategory" ref="categoryDialog" :success-function="() => refetch()"/>
    
    <ItemDialog v-model="category" :submit-function="createItem" ref="itemDialog" :success-function="() => refetch()"/> 
    
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
const { t } = useI18n()
const categoryDialog = ref()
const itemDialog = ref()


const testBuilder: Ref<TestBuilder> = inject('testBuilder')
const refetch: Function = inject('refetch')
const makeAction: Function = inject('makeAction')


const selectedCategoryIndex = ref(-1)

const test: Test = testBuilder.value.getTest()

const showCategoryDialog = ()=>{
    categoryDialog.value.show()
}



const category = ref(new Category())
const item = ref(new Item())
const showItemDialog = (index: number) => {
    selectedCategoryIndex.value = index
    itemDialog.value.show()
}

const createCategory = async () => testBuilder.value.createCategory(category.value)


const deleteCategory = async (id: number) => await makeAction(testBuilder.value.deleteCategory(id), () => { })


const createItem = async () => testBuilder.value.createItem(item.value, selectedCategoryIndex.value)

const deleteItem = async (id: number) => await makeAction(testBuilder.value.deleteItem(id), () => { })



const nextStep = (activateCallback: Function) => {
    try {
        if (test.category.length == 0) {
            throw new Error("categories.lengthmayor que 0")
        }
        test.category.forEach(serie => {
            if (serie.items.length == 0)
                throw new Error("Todas las categorias deben poseer al menos un elemento")
        });
        activateCallback('3')

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