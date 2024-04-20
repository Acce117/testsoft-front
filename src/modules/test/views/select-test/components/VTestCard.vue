<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const props = defineProps({
  id: Number,
  title: String,
  duration: Number,
  description: String,
  recurringTime: Number,
  applicatedTests: Array,
});
const executeTest = () => {
  router.push(`/execute-test/${props.id}`);
};
const showImage = ref(true);
const isAvailable = ref(false);
const now = new Date();
const getAvailabilityTime = () => {
  let availabilityTime = 0;
  if (props.applicatedTests[0]) {
    const lastDate = new Date(props.applicatedTests[0].date);
    lastDate.setFullYear(lastDate.getFullYear() + props.recurringTime);
    availabilityTime = lastDate.getTime() - now.getTime();
  }
  return availabilityTime;
};
const availabilityTime = getAvailabilityTime();
</script>

<template>
  <div
    class="test-card"
    shadow-box
    :class="{
      'not-disponible': !isAvailable,
    }"
    @mouseover="showImage = false"
    @mouseleave="showImage = true"
  >
    <div class="test-card__header" centered>
      <transition name="fast-fade">
        <img v-if="showImage" filter-invert w-5rem src="/img/test_icon.svg" />
      </transition>

      <h2>{{ props.title }}</h2>
      <h2 v-if="!isAvailable && showImage">{{ $t('select-test.test-card.not-available') }}</h2>
    </div>
    <div class="test-card__description" v-if="isAvailable">
      <span
        >{{ $t('select-test.test-card.duration') }}:
        {{ props.duration > 0 ? props.duration + " min" : "Por series" }}</span
      >
      <p>
        <span>{{ $t('select-test.test-card.description') }}: </span>
        {{ props.description }}
      </p>
    </div>

    
    <button
    v-if="isAvailable"
      v-ripple
      class="p-ripple"
      black-button
      text-8
      w-10rem
      m-6
      @click="executeTest()"
    >
    {{ $t('global.execute') }}
    </button>
    <vue-countdown
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
    </vue-countdown>
  </div>
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

.test-card__description > span {
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
