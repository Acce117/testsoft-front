<template>
  <h2 page-title>{{ $t("assign-title.title") }}</h2>
  <VTable>
    <TreeTable
      v-model:selectionKeys="selection"
      :value="data"
      selectionMode="checkbox"
      :size="'large'"
      showGridlines
      striped-rows
    >
      <Column field="name" :header="t('global.name')" expander></Column>
    </TreeTable>
  </VTable>
</template>
<script setup lang="ts">
import VTable from "@/components/VTable.vue";
import TreeTable from "primevue/treetable";
import Column from "primevue/column";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const data = ref([
  {
    key: "0",
    data: { name: "Documents Folder" },
    children: [
      {
        key: "0-0",
        data: "Work Folder",

        children: [
          { key: "0-0-0", data: { name: "Expenses Document" } },
          { key: "0-0-1", data: "Resume Document" },
        ],
      },
      {
        key: "0-1",
        data: "Home Folder",
        children: [
          {
            key: "0-1-0",
            data: "Invoices for this month",
          },
        ],
      },
    ],
  },
]);
const createTableTree = (newData: Array<any>) => {
  newData.forEach((group) => {
    data.value.push(insertGroup(group, newData));
  });
};
const insertGroup = (group: any, parent: any) => {
  let children = [];
  if (group.subGroups.length > 0) {
    group.subGroups.forEach((group: any) =>
      children.push(insertGroup(group, parent))
    );
  }
  const groupFormated = {
    key: group.id,
    data: {
      name: group.name,
    },
    children: children,
  };

  return groupFormated;
};
createTableTree([
  {
    id: "1",
    name: "juan",
    subGroups: [
      {
        id: "3",
        name: "jose",
        subGroups: [
          { id: "4", name: "jesus", subGroups: [] },
          { id: "5", name: "ramon", subGroups: [] },
        ],
      },
      { id: "2", name: "pedro", subGroups: [] },
    ],
  },
]);
console.log(data.value);
const selection = ref([]);
</script>
<style>
.p-treetable td {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.p-checkbox-box,
.p-checkbox {
  height: 2rem;
  width: 2rem;
}
</style>
