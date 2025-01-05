<template>
  <section class="test__header" bg-white rounded-xl>
    <div justify-between h-full flex p-3 w-full items-center>
      <Button severity="secondary" class=" p-ripple h-1/2" icon="pi pi-arrow-left" v-ripple
        :disabled="!(serieIndex > 0)" v-if="props.data?.navigable == 1" @click="prevSerie()"
        v-tooltip.bottom="t('execute-test.tooltips.prev')" placeholder="Bottom" />
      <div flex items-center w-full flex-col>

        <Steps mt-4 flex-1 :model="getSeriesNames()" v-model:activeStep="serieIndex" :readonly="data?.navigable != 1" />
        <div flex gap-8 items-center> 

          <slot name="timer"></slot>
          <Button fluid @click="executeTest.validateTest(test)" icon="pi pi-file-check"
            :label="t('execute-test.tooltips.save')" />
        </div>

      </div>

      <Button :disabled="!(serieIndex < props.data?.series.length - 1)" severity="secondary"
        v-if="props.data?.series.length > 1" class="p-ripple h-1/2 " icon="pi pi-arrow-right" v-ripple
        @click="nextSerie()" v-tooltip.bottom="t('execute-test.tooltips.next')" placeholder="Bottom" />


    </div>
  </section>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import Steps from "primevue/steps";
import { inject, watch } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const props = defineProps({
  data: Object,
});
const emit = defineEmits(['next-serie'])
const executeTest = inject('executeTest')
const test = inject('test')

const serieIndex = executeTest.serieIndex
//SERIE NAVIGATION

const nextSerie = () => {
  emit('next-serie')
}
const prevSerie = () => {
  serieIndex.value -= 1;
};

const getSeriesNames = () => {
  let names = Array();
  if (props.data) {
    props.data.series.forEach((serie: { name: string }) => {
      names.push({ label: serie.name });
    });
  }
  return names;
};

watch(
  serieIndex,
  () => (document.getElementsByClassName("test__container")[0].scrollTop = 0)
);
</script>
<style>
.test__header {
  animation: slide-in-from-top 0.5s ease;
}

.p-steps {
  width: 100% !important;
}
</style>
