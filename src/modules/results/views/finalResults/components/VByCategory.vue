<template>
  <div my-4>
    <h2 text-xl mt-0>
      {{ t('1') }} <strong>{{ props.category?.name }}</strong> {{ t('2') }}:
    </h2>
    <p v-for="item in category?.items" :key="item.id_item">
      <span>

        <strong class='item'>{{ item.name }}</strong>, {{ t('3') }} <strong>{{
          item.value }}</strong><span v-if="item.ranges.length > 0">,
          {{ t('4') }} <strong>{{ item.ranges[0].indicator
          }}</strong></span>.<br />
      </span>
      <span>{{ t('5') }} <strong>{{ item.name }}</strong>
        {{ t('6') }}:
        {{ item.description }}</span><br />
    </p>

    <span>{{ t('7') }} <strong>{{ props.category?.name }}</strong>:
      {{ props.category?.description }}
    </span>
  </div>
  <hr />
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const props = defineProps({
  category: Object,
});
const { t } = useI18n()
</script>
<i18n lang="json">{
  "es": {
    "1": "En la categoría",
    "2": "usted se caracteriza por",
    "3": "con una puntuación de",
    "4": "lo que se considera un valor",
    "5": "El elemento",
    "6": "consiste en",
    "7": "Descripción de la categoría"
  },
  "en": {
    "1": "In the category",
    "2": "you are characterized by",
    "3": "with a score of",
    "4": "which is considered a value",
    "5": "The element",
    "6": "consists of",
    "7": "Category Description"
  }
}</i18n>
