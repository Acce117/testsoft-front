<template>
    <div centered flex-col gap-8 w-full h-full>
      <img filter-invert w-3rem src="/img/connection_lost.svg" />
      <h2 text-10 text-white>{{ $t('global.error') }}...</h2>
      <slot></slot>
    </div>
</template>