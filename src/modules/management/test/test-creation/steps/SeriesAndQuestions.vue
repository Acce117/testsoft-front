<template>
    <StepPanel v-slot="{ activateCallback }" value="3">
        <div flex gap-4 flex-col>
            <h3 my-0 text-slate-600>Inserta las series y sus preguntas</h3>
            <h4 m-0 flex gap-4 items-center>
                Series<Button label="Crear Serie" w-fit @click="showDialog = true" icon="pi pi-plus" />

            </h4>
            {{ test }}
            <section bg-slate-200 pa-3 rounded-xl>

                <div v-for="(serie, index) in test.series" :key="index" shadow-md rounded-lg pa-2 shadow-slate-200
                    bg-white>
                    <div flex gap-2 items-center>
                        <span>{{ serie.name }}</span>
                        <Button label="Añadir Pregunta" icon="pi pi-plus" />
                        <Button label="Eliminar Serie" severity="danger" @click="deleteSerie(index)" icon="pi pi-minus" />

                    </div>
                    <div shadow-md border-8 border-slate-200 rounded-lg pa-2 shadow-slate-200 bg-white>
                        asdasd
                    </div>
                </div>
            </section>




            <div class="flex pt-6 justify-between">
                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('2')" />
                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('4')" />
            </div>
        </div>
    </StepPanel>
    <Dialog v-model:visible="showDialog" modal :header="$t('table.update')" class="w-4/5 max-w-50rem min-w-25rem">
        <Form @submit="createSerie" :validation-schema="serie.getSchema()">
            <div class="dialog-form">

                <VInput v-model="serie.name" name="name" label="Nombre" />
                <VInput v-model="serie.description" rows="3" textarea name="description" label="Descripción" />
                <VInput v-model="serie.time_serie_duration" min="0" number name="time_serie_duration"
                    label="Tiempo de duración (Minutos)" />
            </div>

            <div class="dialog-footer">
                <Button type="button" :label="$t('table.cancel')" severity="secondary"
                    @click="showDialog = false"></Button>
                <Button type="submit" :label="$t('table.save')"></Button>
            </div>
        </Form>
    </Dialog>
</template>
<script setup lang="ts">
import VInput from '@/components/VInput.vue';
import type { Test } from '@/modules/test/models/test.model';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import StepPanel from 'primevue/steppanel';
import { Form } from 'vee-validate';
import { inject, ref, } from 'vue';
import { Serie } from '../../models/serie.model';
const showDialog = ref(false)
const test: Test = inject('test')
const createSerie = () => {
    test.value.series.push({ ...serie.value })
    showDialog.value = false
    serie.value.clearData()
}
const deleteSerie = (index:number) => {
    test.value.series= test.value.series.filter((s:Serie,i:number)=>i!=index)
}
const serie = ref(new Serie())
</script>