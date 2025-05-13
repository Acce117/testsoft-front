<template>
  <section class="test__header" bg-white rounded-xl border border-solid px-4 pb-2 pt-20>
    <div justify-between h-fit flex p-2 w-full items-center>


      <div>
        <h3 text-lg text-justify md:text-xl w-full mb-0 text-center  mt-0 text-primary font-bold >
          {{ props.data?.series[serieIndex].name }}:
        </h3>
        <p  my-1 >{{ props.data?.series[serieIndex].description }}</p>
      </div>





    </div>
    <div flex justify-between pb-2>
      <Button severity="secondary" class=" p-ripple" icon="pi pi-arrow-left" v-ripple :disabled="!(serieIndex > 0)"
        v-if="props.data?.navigable == 1" @click="prevSerie()" :label="t('prev')" placeholder="Bottom" />
      <slot name="timer"></slot>
      <Button :label="t('next')" id="next-serie-button"
        v-if="props.data?.series.length > 1 && serieIndex < props.data?.series.length - 1" class="p-ripple"
        icon="pi pi-arrow-right" v-ripple @click="nextSerie()" placeholder="Bottom" />
      <Button v-if="serieIndex == props.data?.series.length - 1" @click="executeTest.validateTest(test)"
        icon="pi pi-file-check" :label="t('save')" />
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
  executeTest.changeSerie(serieIndex.value - 1)
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
<i18n lang="json">{
  "es": {
    "next": "Siguiente Serie",
    "prev": "Serie Anterior",
    "save": "Finalizar"
  },
  "en": {
    "next": "Next Serie",
    "prev": "Previous Serie",
    "save": "Finish"
  }
}</i18n>
