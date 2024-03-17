<template>
  <div>
    <h2>
      {{$t('results.by-category.1')}} <strong>{{ props.category?.name }}</strong> {{$t('results.by-category.2')}}:
    </h2>

    <span>
      <strong>{{ props.category?.items.name }}</strong
      >, {{$t('results.by-category.3')}} <strong>{{ props.category?.items.value }}</strong
      ><span v-if="props.category?.items.arrayrange.length > 0"
        >, {{$t('results.by-category.4')}} <strong>{{ props.category?.items.indicator }}</strong></span
      >.<br />
    </span>
    <span
      >{{$t('results.by-category.5')}} <strong>{{ props.category?.items.name }}</strong> {{$t('results.by-category.6')}}:
      {{ props.category?.items.description }}</span
    ><br />
    <span
      >{{$t('results.by-category.7')}} <strong>{{ props.category?.name }}</strong
      >:
      {{ props.category?.description }}
    </span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  category: Object,
});
</script>
