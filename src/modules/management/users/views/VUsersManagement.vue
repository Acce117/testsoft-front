<template>
  <h2 page-title>{{ $t("users.title") }}</h2>
  <VTable :error="error" :loading="loading" >
    <DataTable
      :value="result"
      :size="'large'"
      showGridlines
      striped-rows
      :rows="9"
      paginator
      v-model:filters="filters"
      v-model:editingRows="editingRows"
      filterDisplay="row"
      editMode="row"
      @row-edit-save="onRowEditSave"
      h-50rem
    >
      <template #header>
        <div class="table__header">
          <input
            v-model="filters['global'].value"
            :placeholder="t('global.find') + '...'"
            type="text"
            shadow-box
          />
          <VBlackButton
            @click="addDialog = true"
            v-tooltip.top="t('global.add')"
          >
            <img src="/img/add_user.svg" />
          </VBlackButton>
        </div>
      </template>
      <Column field="user.CI" :header="t('users.ci')">
       </Column>
      <Column field="user.name" :header="t('users.name')">
        <template #editor="slotProps">
          <input type="text" v-model="slotProps.data.user.name" w-full />
        </template>
      </Column>
      <Column field="user.last_name" :header="t('users.lastname')">
        <template #editor="slotProps">
          <input type="text" v-model="slotProps.data.user.last_name" w-full />
        </template>
      </Column>
      <Column field="user.username" :header="t('users.username')"
        ><template #editor="slotProps">
          <input
            type="text"
            v-model="slotProps.data.user.username"
            w-full
          /> </template
      ></Column>
      <Column field="user.email" :header="t('users.email')"
        ><template #editor="slotProps">
          <input
            type="text"
            v-model="slotProps.data.user.email"
            w-full
          /> </template
      ></Column>
      <Column field="user.sex" :header="t('users.sex')"></Column>
      <Column field="student_group.name_group" :header="t('users.group')">
        <template #editor="slotProps">
          <TreeSelect
            v-model="slotProps.data.user.fk_id_group"
            w-full
        :options="groups"
        :clearable="false"
        :multiple="false"
        :flat="true"
        :disable-branch-nodes="true"
        :searchable="false"          />
        </template>
      </Column>

      <Column :header="t('global.edit')" :rowEditor="true"></Column>
      <Column :header="t('global.delete')">
        <template #body="slotProps">
          <div pa-.5rem centered>
            <button
              class="p-ripple"
              v-if="slotProps.data.deleted == 0"
              v-ripple
              @click="confirmDelete(slotProps.data, $event)"
              bg-white
            >
              <img src="/img/delete.svg" w-3rem filter-invert cursor-pointer />
            </button>
            <span v-else>{{ $t("global.deleted") }}</span>
          </div>
        </template>
      </Column>

      <template #empty>{{ $t("global.no-results") }} </template>
    </DataTable>
  </VTable>
  <VAddUserDialog v-model="addDialog" :users="result" :groups="groups"/>
</template>
<script setup lang="ts">
import VTable from "@/components/VTable.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "primevue/api";
import { getUsers, deleteUser, updateUser } from "../users";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useConfirm } from "primevue/useconfirm";
import VAddUserDialog from "./dialogs/VAddUserDialog.vue";
import { useSendRequest } from "@/common/utils/fetch";
const confirm = useConfirm();
const { t } = useI18n();
const { result, loading, error } = getUsers();
const groups = useSendRequest(true, `${import.meta.env.VITE_API_PATH}/gestion/group`).result
const editingRows = ref([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const confirmDelete = (user: any, event: any) => {
  confirm.require({
    group: "popup",
    target: event.currentTarget,
    message: t("global.confirm-delete"),
    rejectLabel: t("global.cancel"),
    acceptLabel: t("global.confirm"),
    accept: () => {
      deleteUser(user);
    },
  });
};
const onRowEditSave = (event: any) => {
  let { newData, index } = event;
  console.log(newData);
  updateUser(newData, () => (result.value[index] = newData));
};
const addDialog = ref(false);
</script>
<style>
.p-paginator {
  margin-top: 1rem;
}
.p-paginator-pages {
  display: flex;
  gap: 1rem;
}
.p-paginator-page {
  font-size: 2rem;
}
.p-paginator-page.p-highlight {
  background-color: black;
  color: white;
}
.p-confirm-popup * {
  font-size: 1.5rem;
}
.p-confirm-popup {
  box-shadow: var(--shadow);
  border-radius: var(--bradius);
}
.p-confirm-popup-footer {
  justify-content: space-between;
  display: flex;
  padding: 1rem;
}
.p-confirm-popup-message {
  color: black;
  padding: 1rem;
}
.p-confirm-popup-footer button {
  border-radius: var(--bradius);
  background-color: black;
  color: white;
  padding: 1rem;
}
.p-row-editor-init,
.p-row-editor-cancel-icon,
.p-row-editor-save-icon {
  width: 2rem;
  margin: auto;
  height: 2rem;
  border-radius: 0;
}

.p-cell-editing:has(.p-row-editor-cancel-icon) {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 5rem;
}
</style>
