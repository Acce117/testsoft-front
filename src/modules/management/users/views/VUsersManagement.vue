<template>
  <h2 page-title>{{ $t("users.title") }}</h2>
  <VTable :error="error" :loading="loading">
    <DataTable
      :value="result"
      :size="'large'"
      showGridlines
      striped-rows
      :rows="8"
      paginator
      v-model:filters="filters"
      v-model:editingRows="editingRows"
      filterDisplay="row"
      editMode="row"
      @row-edit-save="onRowEditSave"
    >
      <template #header>
        <div class="table__header">
          <VBlackButton
            @click="addDialog = true"
            v-tooltip.left="t('global.add')"
          >
            <img  src="/img/add_user.svg" />
          </VBlackButton>
          <input
            v-model="filters['global'].value"
            :placeholder="t('global.find') + '...'"
            type="text"
            shadow-box
          />
        </div>
      </template>
      <Column field="CI" :header="t('users.ci')">
        <template #editor="slotProps">
          <input type="text" v-model="slotProps.data.CI" w-full /> </template
      ></Column>
      <Column field="name" :header="t('users.name')"></Column>
      <Column field="last_name" :header="t('users.lastname')"></Column>
      <Column field="username" :header="t('users.username')"></Column>
      <Column field="email" :header="t('users.email')"></Column>
      <Column field="sex" :header="t('users.sex')"></Column>
      <Column field="user_type" :header="t('users.usertype')"></Column>
      <Column :header="t('global.edit')" :rowEditor="true"></Column>
      <Column :header="t('global.delete')">
        <template #body="slotProps">
          <div pa-1rem centered>
            <button
              class="p-ripple"
              v-ripple
              @click="confirmDelete(slotProps.data, $event)"
              bg-white
            >
              <img src="/img/delete.svg" w-3rem filter-invert cursor-pointer />
            </button>
          </div>
        </template>
      </Column>

      <template #empty>{{ $t("global.no-results") }} </template>
    </DataTable>
    {{ result }}
  </VTable>

  <VAddUserDialog v-model="addDialog" />
</template>
<script setup lang="ts">
import VTable from "@/components/VTable.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "primevue/api";
import { getUsers, deleteUser } from "../users";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { userStore } from "@/modules/security/store/user-store";
import { useConfirm } from "primevue/useconfirm";
import VAddUserDialog from "./dialogs/VAddUserDialog.vue";
const confirm = useConfirm();
const { t } = useI18n();
const { result, loading, error } = getUsers();
const editingRows = ref([]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const confirmDelete = (userToDelete: any, event: any) => {
  confirm.require({
    group: "popup",
    target: event.currentTarget,
    message: t("users.dialogs.confirm-delete.message"),
    rejectLabel: t("global.cancel"),
    acceptLabel: t("global.confirm"),
    accept: () => {
      deleteUser(userToDelete, result);
    },
  });
};
const onRowEditSave = (event) => {
  let { newData, index } = event;
  console.log(event);
  result.value[index] = newData;
};
const loadLazyData = (event) => {
  const request = getUsers();
  //lazyParams.value = { ...lazyParams.value, first: event?.first || first.value };
  result.value = request.result;
  loading.value = request.loading;
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
