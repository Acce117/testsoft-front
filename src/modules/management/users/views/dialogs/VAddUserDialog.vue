<template>
  <Dialog v-model:visible="visible" modal :header="t('global.add')" w-80rem>
    <form
      class="p-confirm-dialog-message"
      flex
      flex-wrap
      w-80rem
      gap-2rem
      h-50rem
      data-pc-section="message"
    >
      <h3 w-full>Inserte los datos del nuevo usuario:</h3>
      <VInput id="name" v-model="newUser.name" text="users.name" />

      <VInput id="lastname" v-model="newUser.lastname" text="users.lastname" />
      <VInput
        id="ci"
        v-on:keydown="if(!(new RegExp('/^[\d\b]').test($event.key)) )$event.preventDefault();"
        v-model="newUser.ci"
        text="users.ci"
        :validation="validateCI"
      />
      <VInput
        id="email"
        v-model="newUser.email"
        text="users.email"
        :validation="validateEmail"
      />

      <VInput id="username" v-model="newUser.username" text="users.username" />
      <VInput
        id="password"
        type="password"
        v-model="newUser.password"
        text="users.password"
      />

     
      <Treeselect
        v-model="newUser.group"
        :options="result"
        :placeholder="t('users.group')"
        :clearable="false"
        :multiple="false"
        :flat="true"
        :disable-branch-nodes="true"
        :searchable="false"
        w-25rem
        mb-1rem
        v-on:select="selectGroup"
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
import Treeselect from 'vue3-treeselect'
import 'vue3-treeselect/dist/vue3-treeselect.css'
import Dialog from "primevue/dialog";
import { useI18n } from "vue-i18n";
import { watch } from "vue";
import { validateEmail } from "@/common/utils/validations";
import { validateCI } from "@/common/utils/validations";

const { t } = useI18n();
const visible = defineModel();
//const {result, loading, error}
const loading = false;
const error = false;
const selectGroup=(node:any)=>{
}
const result = ref([
  {
    label: "Australia",
    id: "AU",
    data: "Australia",
    children: [
      {
        label: "New South Wales",
        data: "New South Wales",
        children: [
          { label: "Sydney", id: "A-SY" },
          { label: "Newcastle", id: "A-NE" },
          { label: "Wollongong", id: "A-WO" },
        ],
      },
      {
        label: "Queensland",
        children: [
          { label: "Brisbane", id: "A-BR" },
          { label: "Townsville", id: "A-TO" },
        ],
      },
    ],
  },
  {
    label: "Canada",
    id: "CA",
    children: [
      {
        label: "Quebec",
        children: [
          { label: "Montreal", id: "C-MO" },
          { label: "Quebec City", id: "C-QU" },
        ],
      },
      {
        label: "Ontario",
        children: [
          { label: "Ottawa", id: "C-OT" },
          { label: "Toronto", id: "C-TO" },
        ],
      },
    ],
  },
  {
    label: "United States",
    id: "US",
    children: [
      {
        label: "California",
        cities: [
          { label: "Los Angeles", id: "US-LA" },
          { label: "San Diego", id: "US-SD" },
          { label: "San Francisco", id: "US-SF" },
        ],
      },
      {
        label: "Florida",
        children: [
          { label: "Jacksonville", id: "US-JA" },
          { label: "Miami", id: "US-MI" },
          { label: "Tampa", id: "US-TA" },
          { label: "Orlando", id: "US-OR" },
        ],
      },
      {
        label: "Texas",
        children: [
          { label: "Austin", id: "US-AU" },
          { label: "Dallas", id: "US-DA" },
          { label: "Houston", id: "US-HO" },
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
  group:null
});

</script>
<style>
.p-dropdown *,
.p-dropdown-item-label,

.vue-treeselect * {
  font-size: 1.5rem;
  color: black;
}

.vue-treeselect{
  border: 0.1rem solid transparent;
  border-radius: var(--bradius);
  transition: border ease .2s;

}
.vue-treeselect__control {
  height: 3rem;
  text-align: left;
  box-shadow: var(--shadow);
  border-radius: var(--bradius);
}

.vue-treeselect__value-container{
  height: 3rem;
}
.p-dropdown:hover,
.vue-treeselect:hover {
  border: 0.1rem solid black;
}

@media (min-width: 780px) {
  .p-dropdown,
  .vue-treeselect__control,
  .vue-treeselect__value-container
  {
    height: 4rem;
  }
  .p-dropdown *,
  .p-dropdown-item-label,
  .vue-treeselect__control * {
    font-size: 2rem;
  }
}
</style>
