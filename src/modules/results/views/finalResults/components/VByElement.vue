<template>
  <div>
    <span>{{ t('1') }} <strong>{{ props.element?.value }}</strong> {{ t('2') }},
      <strong class='item'>{{ props.element?.item.name }} ({{
        props.element?.item.category.name
      }})</strong>:<br />
      {{ props.element?.item.description }}</span>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const props = defineProps({
  element: Object,
});
const { t } = useI18n()
</script>

<i18n lang="json">{
  "es": {
    "1": "Con",
    "2": "puntos"
  },
  "en": {
    "1": "With",
    "2": "points"
  }
}</i18n>
