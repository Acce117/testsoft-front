<template>
  <Dialog v-model:visible="visible" modal :header="t('global.add')" w-80rem>
    <form
      class="p-confirm-dialog-message"
      flex
      flex-wrap
      w-80rem
      gap-3rem
      h-60rem
      data-pc-section="message"
    >
      <h3 w-full>Inserte los datos del nuevo usuario:</h3>
      <VInput id="name" v-model="newUser.name" text="users.name" />

      <VInput id="lastname" v-model="newUser.lastname" text="users.lastname" />
      <VInput id="ci" v-model="newUser.ci" text="users.ci" />
      <VInput id="email" v-model="newUser.email" text="users.email" />

      <VInput id="username" v-model="newUser.username" text="users.username" />
      <VInput
        id="password"
        type="password"
        v-model="newUser.password"
        text="users.password"
      />

      <TreeSelect
        loading
        v-if="loading || error"
        :placeholder="t('global.loading') + '...'"
        w-15rem
      />

      <TreeSelect
        v-else
        v-model="newUser.group"
        :options="result"
        optionLabel="key"
        @change="updateGroup($event)"
        :placeholder="t('users.group')"
        w-15rem
      />

      <div class="p-dialog-footer" w-full>
        <button black-button type="button" @click="visible = false">
          {{ $t("global.cancel") }}
        </button>
        <button black-button :class="{ 'p-disabled': true }" type="submit">
          {{ $t("global.add") }}
        </button>
      </div>
    </form>
  </Dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";

import TreeSelect from "primevue/treeselect";
import Dialog from "primevue/dialog";
import { useI18n } from "vue-i18n";
import { watch } from "vue";
const { t } = useI18n();
const visible = defineModel();
//const {result, loading, error}
const loading = false;
const error = false;
const updateGroup = (event: any) => {
      

};
const selectLeaf = (key:string)=>{

}
const result = ref([
  {
    label: "Australia",
    key: "AU",
    data: "Australia",
    children: [
      {
        label: "New South Wales",
        data: "New South Wales",
        children: [
          { label: "Sydney", key: "A-SY" },
          { label: "Newcastle", key: "A-NE" },
          { label: "Wollongong", key: "A-WO" },
        ],
      },
      {
        label: "Queensland",
        children: [
          { label: "Brisbane", key: "A-BR" },
          { label: "Townsville", key: "A-TO" },
        ],
      },
    ],
  },
  {
    label: "Canada",
    key: "CA",
    children: [
      {
        label: "Quebec",
        children: [
          { label: "Montreal", key: "C-MO" },
          { label: "Quebec City", key: "C-QU" },
        ],
      },
      {
        label: "Ontario",
        children: [
          { label: "Ottawa", key: "C-OT" },
          { label: "Toronto", key: "C-TO" },
        ],
      },
    ],
  },
  {
    label: "United States",
    key: "US",
    children: [
      {
        label: "California",
        cities: [
          { label: "Los Angeles", key: "US-LA" },
          { label: "San Diego", key: "US-SD" },
          { label: "San Francisco", key: "US-SF" },
        ],
      },
      {
        label: "Florida",
        children: [
          { label: "Jacksonville", key: "US-JA" },
          { label: "Miami", key: "US-MI" },
          { label: "Tampa", key: "US-TA" },
          { label: "Orlando", key: "US-OR" },
        ],
      },
      {
        label: "Texas",
        children: [
          { label: "Austin", key: "US-AU" },
          { label: "Dallas", key: "US-DA" },
          { label: "Houston", key: "US-HO" },
        ],
      },
    ],
  },
]);
const newUser = ref({
  name: "",
  username: "",
  lastname: "",
  password: "",
  ci: "",
  email: "",
  sex: "",
  user_type: "",
  group: "",
});
watch(newUser.value, (newValue) => {
  console.log("a" + newValue.group);
});
</script>
<style>
.p-dropdown *,
.p-dropdown-item-label,
.p-cascadeselect *,
.p-cascadeselect-item-content {
  font-size: 1.5rem;
  color: black;
}
.p-cascadeselect-item-content {
  justify-content: space-between;
}

.p-cascadeselect-item.p-highlight {
  border: 0.1rem solid black;
  background-color: white;
}

.p-dropdown,
.p-cascadeselect {
  padding: 1rem;
  height: 3rem;
  text-align: left;

  box-shadow: var(--shadow);
  border: 0.1rem solid transparent;
  border-radius: var(--bradius);
}
.p-dropdown:hover,
.p-cascadeselect:hover {
  border: 0.1rem solid black;
}

@media (min-width: 780px) {
  .p-dropdown,
  .p-cascadeselect,
  .p-cascadeselect-item-content {
    height: 4rem;
  }
  .p-dropdown *,
  .p-cascadeselect *,
  .p-dropdown-item-label,
  .p-cascadeselect-item-content {
    font-size: 2rem;
  }
}
</style>
