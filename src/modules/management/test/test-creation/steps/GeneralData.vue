<template>
    <StepPanel v-slot="{ activateCallback }" value="1">
        {{ test }}

        <div flex gap-6 flex-col>
            <h3 my-0 text-slate-600>Inserta los datos generales</h3>

            <VInput v-model="test.name" name="name" label="Nombre" />
            <VInput v-model="test.description" rows="3" textarea name="description" label="Descripción" />
            <VInput v-model="test.time_duration" min="0" number name="time_duration"
                label="Tiempo de duración (Minutos)" />
            <VInput v-model="test.recurring_time" min="0" number name="recurring_time"
                label="Tiempo para poder repetir el test (Años)" />


            <VYesNoQuestion v-model="test.navigable" label="¿Es posible navegar por las diferentes series del test?"
                name="navigable" />
            <VYesNoQuestion v-model="test.completed"
                label="¿Es necesario chequear el completamiento para que el procesamiento del test sea correcto?"
                name="completed" />
            <VSelect v-model="test.fk_id_type_test" optionId="id_type_test" name="fk_id_type_test" label="Tipo de Test" :options="testTypes"
                optionLabel="type_test_name" />
            <VSelect v-model="test.language"  name="language" label="Idioma" :options="[{
                name: 'Español', id: 'es'
            },
            {
                name: 'Inglés', id: 'en'
            }]" optionLabel="name" />
            <VInput v-model="test.formule" name="formule" label="Formula" />
            <div class="flex pt-6 justify-end">
                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="test.create()" />
            </div>

        </div>
    </StepPanel>



</template>
<script setup lang="ts">
import VInput from '@/components/VInput.vue';
import VSelect from '@/components/VSelect.vue';
import VYesNoQuestion from '@/components/VYesNoQuestion.vue';
import Button from 'primevue/button';
import StepPanel from 'primevue/steppanel';
import { inject } from 'vue';
import { useTestTypes } from '../../composables/useTestTypes';
import type { Test } from '@/modules/test/models/test.model';

const test: Test = inject('test')
const { testTypes, isPending } = useTestTypes()

</script>