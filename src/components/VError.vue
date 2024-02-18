<template>
    <div class="error">
      <img src="/img/connection_lost.svg" />
      <h2>Algo ha salido mal...</h2>
      
    </div>
</template>
<style>
.error {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
.error img {
  width: 3rem;
}
@media (min-width: 768px) {
  .error h2{
    font-size: 2.5rem;
}
}


</style>
