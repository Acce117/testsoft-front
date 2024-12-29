<template>
    <StepPanel v-slot="{ activateCallback }" value="2">
        <div flex gap-4 flex-col>
            <h3 my-0 text-slate-600 font-bold>Inserta las categorías y sus elementos</h3>
            <h4 m-0 flex gap-4 items-center>
                Categorías<Button w-fit @click="visibleCategoryDialog = true" icon="pi pi-plus" />

            </h4>
            {{ categories }}
            <section v-if="categories.length > 0" bg-slate-200 flex flex-col gap-4 pa-3 rounded-xl>

                <div v-for="(category, categoryIndex) in categories" :key="categoryIndex" shadow-md rounded-lg pa-2
                    shadow-slate-500 bg-white>
                    <div flex mb-2 items-center justify-between>
                        <span font-bold>{{ category.name }}</span>
                        <div flex gap-2>
                            <Button icon="pi pi-eye" severity="secondary" />
                            <Button severity="danger" @click="deleteCategory(categoryIndex)" icon="pi pi-minus" />

                        </div>

                    </div>
                    <hr border-solid border-1 border-slate-400 />
                    <div shadow-md rounded-lg pa-2 shadow-slate-200 bg-white>
                        <h3 mt-0 flex gap-4 text-sm items-center>
                            Elementos<Button w-fit @click="showItemDialog(categoryIndex)" icon="pi pi-plus" />

                        </h3>
                        <section v-if="category.items.length > 0" bg-slate-200 pa-3 flex flex-col gap-4 rounded-xl>

                            <div v-for="(item, itemIndex) in category.items" :key="itemIndex" shadow-md rounded-lg pa-2
                                shadow-slate-500 bg-white>
                                <div flex justify-between items-center>

                                    <span>{{ item.name }}</span>


                                    <div flex gap-2>
                                        <Button icon="pi pi-eye" severity="secondary" />
                                        <Button severity="danger" @click="deleteItem(categoryIndex, itemIndex)"
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
                    @click="createCategoriesAndItems(activateCallback)" />
            </div>
        </div>
    </StepPanel>
    <Dialog v-model:visible="visibleCategoryDialog" modal :header="$t('table.update')"
        class="w-4/5 max-w-50rem min-w-25rem">
        <Form @submit="createCategory" :validation-schema="category.getSchema()">
            <div class="dialog-form">

                <VInput v-model="category.name" name="name" label="Nombre" />
                <VInput v-model="category.description" rows="3" textarea name="description" label="Descripción" />

            </div>

            <div class="dialog-footer">
                <Button type="button" :label="$t('table.cancel')" severity="secondary"
                    @click="visibleCategoryDialog = false"></Button>
                <Button type="submit" :label="$t('table.save')"></Button>
            </div>
        </Form>
    </Dialog>
    <Dialog v-model:visible="visibleItemDialog" modal :header="$t('table.update')"
        class="w-4/5 max-w-50rem min-w-25rem">
        <Form @submit="createItem" :validation-schema="item.getSchema()">
            <div class="dialog-form">

                <VInput v-model="item.name" name="name" label="Nombre" />
                <VInput v-model="item.description" rows="3" textarea name="description" label="Descripción" />
            </div>

            <div class="dialog-footer">
                <Button type="button" :label="$t('table.cancel')" severity="secondary"
                    @click="visibleItemDialog = false"></Button>
                <Button type="submit" :label="$t('table.save')"></Button>
            </div>
        </Form>
    </Dialog>
</template>
<script setup lang="ts">
import VInput from '@/components/VInput.vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import StepPanel from 'primevue/steppanel';
import { Form } from 'vee-validate';
import { inject, ref, type Ref, } from 'vue';

import useEvents from '@/common/utils/useEvents';
import { useI18n } from 'vue-i18n';
import type { TestBuilder } from '../../classes/TestBuilder';
import { Category } from '../../models/category.model';
import { Item } from '../../models/item.model';
const { t } = useI18n()
const visibleCategoryDialog = ref(false)
const visibleItemDialog = ref(false)

const selectedCategoryIndex = ref(-1)

const testBuilder: Ref<TestBuilder> = inject('testBuilder')
const categories: Ref<Category[]> = ref([])
const category = ref(new Category())
const item = ref(new Item())

const showItemDialog = (index: number) => {
    selectedCategoryIndex.value = index
    visibleItemDialog.value = true
}

const createCategory = () => {
    categories.value.push({ ...category.value })
    visibleCategoryDialog.value = false
    category.value.clearData()
}
const deleteCategory = (index: number) => {
    categories.value = categories.value.filter((c: Category, i: number) => i != index)
}

const createItem = () => {
    categories.value[selectedCategoryIndex.value].items.push({ ...item.value })
    visibleItemDialog.value = false
    item.value.clearData()
}

const deleteItem = (categoryIndex: number, itemIndex: number) => {
    categories.value[categoryIndex].items = categories.value[itemIndex].items.filter((item: Item, i: number) => i != itemIndex)
}

const createCategoriesAndItems = (activateCallback: Function) => {
    try {
        if (categories.value.length == 0) {
            throw new Error("categories.lengthmayor que 0")
        }
        categories.value.forEach(serie => {
            if (serie.items.length == 0)
                throw new Error("Todas las categorias deben poseer al menos un elemento")
        });
        testBuilder.value.setCategoriesAndItems(categories.value)
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