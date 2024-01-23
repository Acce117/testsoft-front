<script setup lang="ts">
const props = defineProps({
    title:String,
    duration:Number,
    description:String
})
</script>
<template>
  <div class="test">
    <div class="test__header">
      <img src="/img/test_icon.svg" />
      <h2>{{props.title }}</h2>
    </div>
    <div class="test__description">
      <span>Duración: {{props.duration }} min</span>
      <p>
        <span>Descripción: </span>
       {{ props.description }}
      </p>
    </div>

    <button>Ejecutar</button>
  </div>
</template>
<style>
.test {
  width: 30rem;
  height: 30rem;
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
}

.test:hover {
  transform: scale(1.1);
  height: 40rem;
}

.test__description {
  opacity: 0;
  transition: all ease 0.2s;
  margin: 1rem;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: .5rem;
  height: 15rem;
  overflow: scroll;
}
.test__description span{
    font-weight: bold;
}
.test__description p {
  text-align: left;
}
.test:hover .test__description {
  opacity: 1;
}

.test button {
  background-color: black;
  border: none;
  color: white;
  border-radius: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem;
  transition: all ease 0.2s;
  box-shadow: 0rem 0rem 0.2rem 0.2rem #00000030;
  width: 40%;
  margin: 2rem;
}
.test button:hover {
  transform: scale(1.1);
}
.test button:active {
  transform: scale(1.2);
  color: black;
  background-color: white;
}
.test__header {
  background-color: black;
  transition: all ease 0.2s;
  width: 100%;
}
.test__header img {
  margin: 1rem;
}
.test__header h2 {
  font-weight: bold;
  color: white;
  font-size: 2rem;
  margin: 1rem;
}
</style>
