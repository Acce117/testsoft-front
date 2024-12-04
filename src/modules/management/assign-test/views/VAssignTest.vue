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
      v-on:node-expand="getGroupsOfChild($event)"
    >
      <Column field="name" :header="t('global.name')" expander></Column>
    </TreeTable>
    {{ prueba }}
  </VTable>
</template>
<script setup lang="ts">
import VTable from "@/components/VTable.vue";
import TreeTable from "primevue/treetable";
import Column from "primevue/column";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { getGroups } from "./../assign-test";
import { useSendRequest } from "@/common/utils/fetch";
const { result, error, loading } = getGroups("1");
watch(result, (newValue) => {
  createTableTree(newValue);
  prueba.value = newValue;
});
const { t } = useI18n();
const data = ref([]);
const createTableTree = (newData: Array<any>) => {
  newData.forEach((group) => {
    data.value.push(insertGroup(group, newData));
  });
};
const insertGroup = (group: any, parent: any) => {
  let children = [];
  if (group.arraystudent_group) {
    group.arraystudent_group.forEach((group: any) =>
      children.push(insertGroup(group, parent))
    );
  }

  return getGroupFormatted(group, children);
};
const getGroupFormatted = (group, children) => {
  return {
    key: group.id_student_group,
    data: {
      name: group.name_group,
    },
    children: children,
  };
};
const getGroupsOfChild = (event) => {
  const request = useSendRequest(false);
  request.sendRequest(
    `${import.meta.env.VITE_API_PATH}/gestion/group`,
    {
      attr: { father_group: event.key },
      relations: ["arraystudent_group"],
    },
    "GET",
    () => {
      prueba.value = request.result;
      let groupsFormatted =[]
      request.result.value.forEach(group=>{
        console.log(group)
        groupsFormatted.push(getGroupFormatted(group,group.arraystudent_group))
      })
      prueba.value = groupsFormatted
      event.children = groupsFormatted
    }
  );

};
const prueba = ref();
const selection = ref([]);
</script>
<style>

.p-checkbox-box,
.p-checkbox {
  height: 2rem;
  width: 2rem;
}
</style>
