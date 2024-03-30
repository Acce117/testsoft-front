<template>
  <h2 page-title>{{ $t("users.title") }}</h2>
  <VButtonsContainer top-6rem v-if="!loading && !error">
      <VWhiteButton @click="addDialog = true" v-tooltip.right="t('global.add')">
        <img src="/img/add_user.svg" />
      </VWhiteButton>
    </VButtonsContainer>
  <VTable :error="error" :loading="loading">
    
    <DataTable
      :value="result"
      :size="'large'"
      showGridlines
      scrollable
      scrollHeight="60vh"
      striped-rows
      v-model:filters="filters"
      filterDisplay="row"
      editMode="cell"
      :virtualScrollerOptions="{ itemSize: 46 }"
      @cell-edit-complete="onCellEditComplete($event)"
    >
      <template #header>
        <div class="table__header">
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
  </VTable>

  <VAddUserDialog v-model="addDialog" />
</template>
<script setup lang="ts">
import VTable from "@/components/VTable.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "primevue/api";
import { getUsers, deleteUser } from "./../users.ts";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { userStore } from "@/modules/security/store/user-store";
import { useConfirm } from "primevue/useconfirm";
import VAddUserDialog from "./dialogs/VAddUserDialog.vue";
const confirm = useConfirm();
const { t } = useI18n();
const { result, loading, error } = getUsers(userStore().ci);
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
const onCellEditComplete = (event) => {
  let { data, originalEvent, newValue, field } = event;

  switch (field) {
    default:
      console.log(originalEvent);
      if (
        originalEvent.target.localName !== "td" &&
        originalEvent.target.localName !== "input" &&
        newValue.trim().length > 0
      ) {
        confirm.require({
          message: t("users.dialogs.confirm-edit.message"),
          rejectLabel: t("global.cancel"),
          acceptLabel: t("global.confirm"),
          accept: () => {
            data[field] = newValue;
          },
          reject: () => {
            event.preventDefault();
          },
        });
      } else event.preventDefault();
      break;
  }
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
</style>
