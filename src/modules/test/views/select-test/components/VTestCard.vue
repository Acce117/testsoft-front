<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import Tag from "primevue/tag";
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const props = defineProps({
  test: { type: Object, required: true },
});

const emit = defineEmits(['show-dialog'])


const isAvailable = ref(false);
const now = new Date();
// const getAvailabilityTime = () => {
//   let availabilityTime = 0;
//   if (props.applicatedTests[0]) {
//     const lastDate = new Date(props.applicatedTests[0].date);
//     lastDate.setFullYear(lastDate.getFullYear() + props.recurringTime);
//     availabilityTime = lastDate.getTime() - now.getTime();
//   }
//   return availabilityTime;
// };
//const availabilityTime = getAvailabilityTime();
</script>

<template>
  <div
    class="border  h-15rem shadow-lg border-1 border-solid border-slate-200 bg-white overflow-hidden flex flex-col justify-between rounded-xl m-2 mt-4  p-4">

    <div class=" font-semibold text-lg text-secondary  overflow-scroll">{{ props.test.name }}
      <div class="card mt-2 flex flex-wrap  gap-2">
        <Tag severity="secondary" :value="props.test.time_duration > 0 ?
          props.test.time_duration +
          ' min' : 'Por series'" icon="pi pi-stopwatch" rounded></Tag>
        <Tag severity="secondary" :value="props.test.fk_id_type_test == 1 ? 'Psicométrico' : 'Personalidad'"
          icon="pi pi-file-edit" rounded></Tag>
      </div>
    </div>


    <Button icon="pi pi-file-edit" fluid :label="$t('global.execute')" h-10 @click="emit('show-dialog', props.test)" />
  </div>
  <!-- <div class="test-card" :class="{
    'not-disponible': !isAvailable,
  }" @mouseover="showImage = false" @mouseleave="showImage = true">
    <div class="test-card__header" centered>


      <h2 v-if="!isAvailable && showImage">{{ $t('select-test.test-card.not-available') }}</h2>
    </div> -->




  <!-- <vue-countdown
      :time="availabilityTime"
      v-slot="{ days, hours, minutes, seconds }"
      @end="isAvailable = true"
      class="test-card__availability"
      v-else
    >
    {{ $t('select-test.test-card.available') }}:<br />
      <div text-left min-w-56>
        <span v-if="days > 0">{{ days }} días<br /></span>
        <span v-if="hours > 0">{{ hours }} horas<br /> </span>
        <span v-if="minutes > 0">{{ minutes }} minutos<br /> </span>
        <span v-if="seconds >= 0">{{ seconds }} segundos</span>
      </div>
    </vue-countdown> -->
  <!-- </div> -->
</template>

<style>
.test-card {
  position: relative;
  width: 28rem;
  height: 35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  margin: 0 auto;
  overflow: hidden;
  transition: all ease 0.2s;
  animation: 0.3s scale;
}

.test-card__availability {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  color: black;
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 45%;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
}

.test-card__description {
  opacity: 0;
  transition: all ease 0.2s;
  margin: 40% 0.2rem 0 0.2rem;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 0.5rem;
  height: 17rem;
  overflow: auto;
}

.test-card__description span,
.test-card__header h2 {
  font-weight: bold;
}

.test-card__description>span {
  margin: 0 1rem;
}

.test-card__description p {
  text-align: justify;
  padding: 0 1rem;
}

.test-card:hover .test-card__description {
  opacity: 1;
}

.test-card__header {
  background-color: black;
  position: absolute;
  flex-direction: column;
  transition: all ease 0.2s;
  width: 100%;
  height: 80%;
  gap: 1rem;
  opacity: 1;
  overflow: auto;
  z-index: 2;
}

.test-card__header h2 {
  color: white;
  font-size: 2rem;
  width: 90%;
}

.test-card.p-disabled img {
  display: none;
}

.test-card.not-disponible .test-card__header {
  height: 100%;
}

.test-card:hover .test-card__header {
  height: 30%;
}
</style>
