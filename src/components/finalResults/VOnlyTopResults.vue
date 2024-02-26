<template>
  <div v-if="props.testResult?.process.count_max > 0">
    <div v-if="props.testResult?.process.count_min > 0">
      <h2>
        Tus
        {{
          props.testResult?.process.fk_id_test == 3 ? "roles" : "elementos"
        }}
        preferidos son:
      </h2>
      <div v-for="element in props.testResult?.Preferred">
        <VByElement
          v-if="props.testResult?.process.all_element_value == 1"
          :element="element"
        />
        <VByCategory
          v-else-if="props.testResult?.process.element_by_category == 1"
          :category="element"
        />
      </div>
    </div>
    <div v-else>
      <div v-for="element in props.testResult?.categories">
        <VByElement
          v-if="props.testResult?.process.all_element_value == 1"
          :element="element"
        />
        <VByCategory
          v-else-if="props.testResult?.process.element_by_category == 1"
          :category="element"
        />
      </div>
    </div>
  </div>
  <div v-if="props.testResult?.process.count_min > 0">
    <div v-if="props.testResult?.process.count_max > 0">
      <h2>
        Tus
        {{
          props.testResult?.process.fk_id_test == 3 ? "roles" : "elementos"
        }}
        evitados son:
      </h2>
      <div v-for="element in props.testResult?.Avoided">
        <VByElement
          v-if="props.testResult?.process.all_element_value == 1"
          :element="element"
        />
        <VByCategory
          v-else-if="props.testResult?.process.element_by_category == 1"
          :category="element"
        />
      </div>
    </div>
    <div v-else>
      <div v-for="element in props.testResult?.categories">
        <VByElement
          v-if="props.testResult?.process.all_element_value == 1"
          :element="element"
        />
        <VByCategory
          v-else-if="props.testResult?.process.element_by_category == 1"
          :category="element"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import VByCategory from "./components/VByCategory.vue";
import VByElement from "./components/VByElement.vue";
const props = defineProps({
  testResult: Object,
});
</script>
