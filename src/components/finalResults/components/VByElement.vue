<template>
  <div>
    <span
      >{{ $t('results.by-element.1') }} <strong>{{ props.element?.value_result }}</strong> {{ $t('results.by-element.2') }},
      <strong
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
