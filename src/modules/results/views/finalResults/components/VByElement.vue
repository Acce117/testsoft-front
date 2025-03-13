<template>
  <div>
    <span
      >{{ $t('results.by-element.1') }} <strong>{{ props.element?.value }}</strong> {{ $t('results.by-element.2') }},
      <strong class='item'
        >{{ props.element?.item.name }} ({{
          props.element?.item.category.name
        }})</strong
      >:<br />
      {{ props.element?.item.description }}</span
    >
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  element: Object,
});
</script>
