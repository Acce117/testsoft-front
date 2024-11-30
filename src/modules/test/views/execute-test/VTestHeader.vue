<template>
  <div class="test__header" bg-white rounded-xl>
    <div  justify-between flex p-3 w-full >
      <Button
        class=" p-ripple"
        icon="pi pi-arrow-left"

        v-ripple
        :disabled="!(serieIndex > 0)"
        v-if="props.data?.navigable == 1"
        @click="prevSerie()"
        v-tooltip.bottom="t('execute-test.tooltips.prev')"
        placeholder="Bottom"
      />
      <slot name="timer"></slot>

      
      <Button
        :disabled=" !(serieIndex < props.data?.series.length - 1)"
        v-if="props.data?.series.length > 1"
        class="p-ripple "
        icon="pi pi-arrow-right"
        v-ripple
        @click="nextSerie()"
        v-tooltip.bottom="t('execute-test.tooltips.next')"
        placeholder="Bottom"
      />
        
      
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import Steps from "primevue/steps";
import {  inject, watch } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const props = defineProps({
  data: Object,
});
const emit = defineEmits(['next-serie'])
const serieIndex = inject('executeTest').serieIndex
//SERIE NAVIGATION

const nextSerie=()=>{
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
  () => (document.getElementsByTagName("main")[0].scrollTop = 0)
);
</script>
<style>
.test__header {
  animation: slide-in-from-top 0.5s ease;
}

</style>
