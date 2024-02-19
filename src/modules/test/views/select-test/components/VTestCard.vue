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
    console.log(lastDate);
    lastDate.setFullYear(lastDate.getFullYear() + props.recurringTime);
    availabilityTime = lastDate.getTime() - now.getTime();
  }

  return availabilityTime;
};
</script>

<template>
  <div class="test-card__container">
    <div
      class="test-card"
      :class="{ 'p-disabled': !isAvailable }"
      @mouseover="showImage = false"
      @mouseleave="showImage = true"
    >
      <div class="test-card__header">
        <transition name="fast-fade">
          <img v-if="showImage" src="/img/test_icon.svg" />
        </transition>

        <h2>{{ props.title }}</h2>
      </div>
      <div class="test-card__description">
        <span>Duración: {{ props.duration }} min</span>
        <p>
          <span>Descripción: </span>
          {{ props.description }}
        </p>
      </div>

      <button v-if="isAvailable" class="black-button" @click="executeTest()">
        Ejecutar
      </button>
    </div>
    
    <vue-countdown
      :time="getAvailabilityTime()"
      v-slot="{ days, hours, minutes, seconds }"
      @end="isAvailable = true"
      class="test-card__availability"
      v-if="!isAvailable"
    >{{ props.title }}
    <span>Disponible en:<br>{{ days }} días,<br>{{ hours }} horas,<br>{{ minutes }} minutos<br>{{ seconds }} segundos</span>
    </vue-countdown>
  </div>
</template>

<style>
.test-card__container {
  position: relative;
  transition: all ease 0.2s;
  animation: 0.3s scale;
  display: flex;
  border-radius: 1.5rem;
  justify-content: center;
  overflow: hidden;
  box-shadow: var(--shadow);
}
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
}

.test-card:hover .test-card__header {
  height: 25%;
}
.test-card__availability {
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 2;
  top: 0;
  color: black;
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 10%;
  text-align: center;
  align-items: center;
  width: 100%;
  gap: 2rem;
}
.test-card__availability span{
  text-align: left;
  font-weight: bold;
}

.test-card__description {
  opacity: 0;
  transition: all ease 0.2s;
  margin: 35% 0.2rem 0 0.2rem;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 0.5rem;
  height: 17rem;
  overflow: auto;
}
.test-card__description span,
.test-card__header h2,
.test-card button {
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

.test-card button {
  font-size: 1.5rem;
  width: 40%;
  margin: 1.5rem;
}

.test-card__header {
  background-color: black;
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  transition: all ease 0.2s;
  width: 100%;
  height: 80%;
  gap: 2rem;
  opacity: 1;
  overflow: auto;
}
.test-card__header img {
  filter: invert();
  width: 5rem;
}
.test-card__header h2 {
  color: white;
  font-size: 1.5rem;
  width: 90%;
}

.test-card.p-disabled img {
  display: none;
}
.test-card.p-disabled .test-card__header {
  height: 100%;
  justify-content: flex-start;
 
}
.test-card.p-disabled .test-card__header h2{
  margin-top: 0;
  color: black;
}
</style>
