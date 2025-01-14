<template>
    <StepPanel v-slot="{ activateCallback }" :value="`${props.value}`">

        <div flex gap-4 flex-col>
            <h3 my-0 text-slate-600 font-bold>Cerrar test</h3>
            <h4 m-0 flex gap-4 items-center>
                ¿Desea cerrar el test? Solo de esta forma podrá asignarlo a los grupos, pero no podrá volver a editarlo.
            </h4>
            <div class="flex pt-6 justify-between">
                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback(`${parseInt(props.value)-1}`)" />
                <Button label="Cerrar Test"  icon="pi pi-lock" iconPos="right"
                    @click="closeTest()" />
            </div>
        </div>
    </StepPanel>
</template>
<script setup lang="ts">
import type {  } from '@/modules/management/test/models/test.model';
import Button from 'primevue/button';
import StepPanel from 'primevue/steppanel';
import { inject , type Ref, } from 'vue';
import useEvents from '@/common/utils/useEvents';
import { useI18n } from 'vue-i18n';
import type { TestBuilder } from '../../classes/TestBuilder';
import router from '@/router';
const props = defineProps({
    value: {
        type: String,
        required: true
    }
})


const testBuilder: Ref<TestBuilder> = inject('testBuilder')

const { t } = useI18n()

const closeTest = async () => {
    try {
        await testBuilder.value.closeTest()
        router.push('/test')
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