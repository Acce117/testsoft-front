<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const props = defineProps({
  id: Number,
  title: String,
  duration: Number,
  description: String,
});
const executeTest = () => {
  router.push(`/execute-test/${props.id}`);
};
const showImage = ref(true);
</script>

<template>
  <div
    class="test-card"
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

    <button class="black-button" @click="executeTest()">Ejecutar</button>
  </div>
</template>

<style>
.test-card {
  position: relative;
  width: 28rem;
  height: 35rem;
  box-shadow: var(--shadow);
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  margin: 0 auto;
  transition: all ease 0.2s;
  overflow: hidden;
  animation: 0.3s scale;
}

.test-card:hover .test-card__header {
  height: 25%;
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
.test-card__description span, .test-card__header h2, .test-card button {
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
</style>
