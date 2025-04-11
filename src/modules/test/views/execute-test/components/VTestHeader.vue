<template>
  <section class="test__header" bg-white rounded-xl border  border-solid  px-4 pb-2 pt-20>
    <div justify-between h-fit flex p-2 w-full items-center>



      <h3 text-lg text-justify md:text-xl w-full text-center mb-2 mt-0 text-slate-800>
        <span text-primary font-bold>{{ props.data?.series[serieIndex].name }}:</span> {{ props.data?.series[serieIndex].description }}
      </h3>




    </div>
    <div flex justify-between pb-2 >
      <Button severity="secondary" class=" p-ripple" icon="pi pi-arrow-left" v-ripple :disabled="!(serieIndex > 0)"
        v-if="props.data?.navigable == 1" @click="prevSerie()" :label="t('execute-test.tooltips.prev')"
        placeholder="Bottom" />
      <slot name="timer"></slot>
      <Button :label="t('execute-test.tooltips.next')" id="next-serie-button"
        v-if="props.data?.series.length > 1 && serieIndex < props.data?.series.length - 1" class="p-ripple" icon="pi pi-arrow-right" v-ripple @click="nextSerie()"
        placeholder="Bottom" />
      <Button v-if="serieIndex == props.data?.series.length - 1" @click="executeTest.validateTest(test)" icon="pi pi-file-check"
        :label="t('execute-test.tooltips.save')" />
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
  /* animation: slide-in-from-top 0.5s ease; */
  border: solid 1px rgb(226 232 240) !important;

}

.p-steps {
  width: 100% !important;
  margin: 0 !important;
}

.p-steps-item-link {
  gap: 0rem !important;
}
</style>
