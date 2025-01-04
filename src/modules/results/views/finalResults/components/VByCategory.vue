<template>
  <div>
    <h2>
      {{ $t('results.by-category.1') }} <strong>{{ props.category?.name }}</strong> {{ $t('results.by-category.2') }}:
    </h2>
    <p v-for="item in category?.items" :key="item.id_item">
      <span>

        <strong>{{ item.name }}</strong>, {{ $t('results.by-category.3') }} <strong>{{
          item.value }}</strong><span v-if="item.ranges.length > 0">,
          {{ $t('results.by-category.4') }} <strong>{{ item.ranges[0].indicator
            }}</strong></span>.<br />
      </span>
      <span>{{ $t('results.by-category.5') }} <strong>{{ item.name }}</strong>
        {{ $t('results.by-category.6') }}:
        {{ item.description }}</span><br />
      </p>

    <span>{{ $t('results.by-category.7') }} <strong>{{ props.category?.name }}</strong>:
      {{ props.category?.description }}
    </span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  category: Object,
});
</script>
