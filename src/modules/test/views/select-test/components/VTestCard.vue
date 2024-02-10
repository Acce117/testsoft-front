<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  id:Number,
  title: String,
  duration: Number,
  description: String,
});
const executeTest = () => {
  router.push(`/execute-test/${props.id}`);
};
</script>

<template>
  <div class="test-card">
    <div class="test-card__header">
      <img src="/img/test_icon.svg" />
      <h2>{{ props.title }}</h2>
    </div>
    <div class="test-card__description">
      <span>Duración: {{ props.duration }} min</span>
      <p>
        <span>Descripción: </span>
        {{ props.description }}
      </p>
    </div>

    <button @click="executeTest()">Ejecutar</button>
  </div>
</template>

<style>
.test-card {
  width: 20rem;
  height: 25rem;
  box-shadow: 0rem 0rem 0.6rem 0.6rem #00000030;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  margin: 0 auto;
  transition: all ease 0.2s;
  overflow: hidden;
  animation: .3s scale;
}

.test-card:hover {
  height: 35rem;
}

.test-card__description {
  opacity: 0;
  transition: all ease 0.2s;
  margin: 1rem;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 0.5rem;
  height: 15rem;
  overflow: scroll;
}
.test-card__description span {
  font-weight: bold;
}
.test-card__description p {
  text-align: left;
}
.test-card:hover .test-card__description {
  opacity: 1;
}

.test-card button {
  background-color: black;
  color: white;

  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem;
  width: 40%;
  margin: 2rem;
}

.test-card button:active {
  color: black;
  background-color: white;
}
.test-card__header {
  background-color: black;
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: all ease 0.2s;
  width: 100%;
}
.test-card__header img {
  filter: invert();
  width: 5rem;
  margin: 2rem;
}
.test-card__header h2 {
  font-weight: bold;
  color: white;
  font-size: 1.5rem;
  width: 90%;
  margin-bottom: 1rem;
}
@media (min-width: 480px) {
  .test-card {
    width: 25rem;
  }
}
</style>
