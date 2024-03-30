<template>
  <h2 page-title>{{ $t("assign-title.title") }}</h2>
  <div flex flex-items-center flex-justify-center mt-2rem>
    <OrganizationChart
      v-model:selectionKeys="selection"
      :value="data"
      selectionMode="multiple"
    >
      <template #default="slotProps">
        <span>{{ slotProps.node.label }}</span>
      </template>
    </OrganizationChart>
    <
  </div>
</template>
<script setup lang="ts">
import OrganizationChart from "primevue/organizationchart";
import { ref } from "vue";
const data = ref({
  label: "Grupo 1",
  key: ["0", "0_1"],
  children: [
    {
      label: "Grupo 2",
      key: "0_1",
      children: [
        {
          label: "Grupo 3",
        },
        {
          label: "Grupo 4",
        },
      ],
    },
    {
      label: "Grupo 5",
      children: [
        {
          label: "Grupo 6",
        },
        {
          label: "Grupo 7",
        },
      ],
    },
  ],
});
const selection = ref([]);

</script>
<style>
.p-organizationchart-node-content {
  font-size: 2rem;
  color: black;
  padding: 2rem;
  margin: 0 2rem;
  border-radius: var(--bradius);
}
.p-organizationchart-line-down {
  margin-left: 50%;
}
.p-organizationchart-node-content.p-highlight {
  background-color: black;
  color: white;
}
</style>
