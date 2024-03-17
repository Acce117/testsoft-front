<template>
  <div class="test__header">
    <h2 page-title w-20rem h-6rem m-l-0.5rem lg:w-50rem>
      {{ props.result?.name }}
    </h2>
    <div centered gap-1rem flex-1 mb-1rem mt-4rem>
      <button
        class="white-button p-ripple"
        v-ripple
        :class="{
          'p-disabled': !(serieIndex > 0),
        }"
        v-if="props.result?.navigable == 1"
        @click="prevSerie()"
        v-tooltip.bottom="t('execute-test.tooltips.prev')"
        placeholder="Bottom"
      >
        <img src="/img/arrow.svg" alt="serie anterior" rotate-180deg />
      </button>
      <Steps
        :model="getSeriesNames()"
        v-model:activeStep="serieIndex"
        :readonly="props.result?.navigable != 1"
      />
      <button
        :class="{
          'p-disabled': !(serieIndex < props.result?.arrayserie.length - 1),
        }"
        v-if="props.result?.arrayserie.length > 1"
        class="p-ripple white-button"
        v-ripple
        @click="nextSerie()"
        v-tooltip.bottom="t('execute-test.tooltips.next')"
        placeholder="Bottom"
      >
        <img src="/img/arrow.svg" alt="siguiente serie" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Steps from "primevue/steps";
import {  watch, inject } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const props = defineProps({
  result: Object,
});
const emit = defineEmits(['next-serie'])
const serieIndex = inject("serieIndex");
//SERIE NAVIGATION

const nextSerie=()=>{
    emit('next-serie')
}
const prevSerie = () => {
  serieIndex.value -= 1;
};

const getSeriesNames = () => {
  let names = Array();
  if (props.result) {
    props.result.arrayserie.forEach((serie: { name: string }) => {
      names.push({ label: serie.name });
    });
  }
  return names;
};

watch(
  serieIndex,
  () => (document.getElementsByTagName("main")[0].scrollTop = 0)
);
</script>
<style>
.test__header {
  position: absolute;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1.2rem);
  -webkit-backdrop-filter: blur(1.2rem);
  z-index: 1;
  width: 100%;
  top: 0;
  height: 15rem;
  box-shadow: var(--shadow);
  animation: slide-in-from-top 0.5s ease;
}
</style>
