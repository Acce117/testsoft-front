<template>
    <div class="loading">
      <img src="/img/loading.svg" />
    </div>
</template>
<style>
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.loading img {
  width: 3rem;
  animation: rotateX 1s infinite;
}
@keyframes rotateX {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
