<template>
  <h2 page-title>{{ $t("users.title") }}</h2>
  <VTable :error="error" :loading="loading">
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
      dataKey="id_student"
      @row-edit-save="onRowEditSave"
      @row-edit-init="onRowEditInit"
      @row-edit-cancel="onRowEditCancel"
      min-h-50rem
    >
      <template #header>
        <div class="table__header">
          <input
            class="find-input"
            v-model="filters['global'].value"
            :placeholder="t('global.find') + '...'"
            type="text"
            shadow-box
          />
          <VBlackButton
            class="add-button"
            @click="addDialog = true"
            v-tooltip.top="t('global.add')"
          >
            <img src="/img/add_user.svg" />
          </VBlackButton>
        </div>
      </template>
      <Column field="fk_CI" :header="t('users.ci')"> </Column>
      <Column field="user.name" :header="t('users.name')">
        <template #editor="{ data, field }">
          <VInputTable id="name-table" v-model="data.user.name" />
        </template>
      </Column>
      <Column field="user.last_name" :header="t('users.lastname')">
        <template #editor="{ data, field }">
          <VInputTable id="lastname-table" v-model="data.user.last_name" />
        </template>
      </Column>
      <Column field="user.username" :header="t('users.username')"
        ><template #editor="{ data, field }">
          <VInputTable
            id="lastname-table"
            v-model="data.user.username"
            :validation="validateUsername"
          /> </template
      ></Column>
      <Column field="user.email" :header="t('users.email')"
        ><template #editor="{ data, field }">
          <VInputTable
            id="email-table"
            v-model="data.user.email"
            :validation="validateEmail"
          /> </template
      ></Column>
      <Column field="user.sex" :header="t('users.sex')"></Column>
      <Column field="student_group.name_group" :header="t('users.group')">
        <template #editor="{ data, field }">
          <Treeselect
            v-model="data.fk_id_group"
            w-15rem
            :options="groups"
            :clearable="false"
            :multiple="false"
            :flat="true"
            :disable-branch-nodes="true"
            :searchable="false"
            v-on:select="(node:any)=>onGroupSelected(node,data)"
          />
        </template>
      </Column>

      <Column :header="t('global.edit')" :rowEditor="true"></Column>
      <Column :header="t('global.delete')">
        <template #body="slotProps">
          <div pa-.5rem centered>
            <button
              class="p-ripple delete-button"
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

  <VAddUserDialog v-model="addDialog" :users="result" :groups="groups" />
</template>
<script setup lang="ts">
import Treeselect from "vue3-treeselect";
import VInputTable from "@/components/VInputTable.vue";
import VTable from "@/components/VTable.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "primevue/api";
import { getUsers, deleteUser, updateUser } from "../users";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useConfirm } from "primevue/useconfirm";
import { validateEmail, validateEmptyString } from "@/common/utils/validations";
import VAddUserDialog from "./dialogs/VAddUserDialog.vue";
import { useSendRequest } from "@/common/utils/fetch";
const confirm = useConfirm();
const { t } = useI18n();
const { result, loading, error } = getUsers();
const onGroupSelected = (node: any, user: any) => {
  user.student_group.name_group = node.label;
};
const groups = useSendRequest(
  true,
  `${import.meta.env.VITE_API_PATH}/gestion/group`
).result;
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
  updateUser(
    {
      id_student: newData.id_student,
      student: {
        username: newData.user.username,
        email: newData.user.email,
        fk_id_group: newData.fk_id_group,
        name: newData.user.name,
        last_name: newData.user.last_name,
      },
    },
    () => {
      result.value[index] = newData;
    },
    () => {
      setOldData(newData, oldEditData);
    }
  );
};
////
let oldEditData = {
  username: null,
  group: null,
  name: null,
  last_name: null,
  email: null,
  name_group: null,
};
const setOldData = (newData: any, oldData: any) => {
  newData.user.username = oldData.username;
  newData.fk_id_group = oldData.group;
  newData.user.name = oldData.name;
  newData.user.last_name = oldData.last_name;
  newData.user.email = oldData.email;
  newData.student_group.name_group = oldData.name_group;
  newData.student_group.id_student_group = oldData.group;
};
const onRowEditCancel = (event: any) => {
  let { newData } = event;
  setOldData(newData, oldEditData);
};
const onRowEditInit = (event: any) => {
  oldEditData = {
    username: event.data.user.username,
    group: event.data.fk_id_group,
    name: event.data.user.name,
    last_name: event.data.user.last_name,
    email: event.data.user.email,
    name_group: event.data.student_group.name_group,
  };
};
const validateUsername = (text: string) => {
  validateEmptyString(text);
  let existentUsername = result.value.filter(
    (user) => user.user.username === text
  );
  console.log(existentUsername)
  if (existentUsername.length > 1) throw new Error("error.existent_username");
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
tr:has(.invalid-input) .p-row-editor-save,
table:has(input) .p-row-editor-init,
table:has(input) .delete-button {
  pointer-events: none;
  opacity: 0.5;
}

.p-cell-editing:has(.p-row-editor-cancel-icon) {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 5rem;
}
</style>
