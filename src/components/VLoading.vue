<template>
  <div centered w-full h-full gap-3 >
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>
<style>
@keyframes opac {
  0% {
    opacity: 0%;
  }
  5% {
    opacity: 50%;

  }
  20% {
    opacity: 100%;
   
  }
  40% {
    opacity: 50%;
 
  }
  100% {
    opacity: 0%;
  }
}

.dot {
  width: 1rem;
  height: 1rem;
  border-radius: 100%;
  animation: opac 1s infinite ease-in-out;
  background-color: white;
}

.dot:nth-child(1) {
  background-color: #5c5c5b;
}

.dot:nth-child(2) {
  background-color: #babab8;
  animation-delay: 0.3s;
}

.dot:nth-child(3) {
  background-color: #8c8c8b;
  animation-delay: 0.6s;
}
</style>
