<template>
  <Dialog v-model:visible="visible" modal :header="t('global.add')" w-80rem h-60rem>
    <form
      class="p-confirm-dialog-message"
      @submit.prevent="
        addUser(newUser, props.users, () => {
          visible = false;
        })
      "
      flex
      flex-wrap
      w-80rem
      gap-2rem
      h-50rem
      data-pc-section="message"
    >
      <h3 w-full>{{ $t("users.add") }}</h3>
      <VInput
        id="name"
        v-model="newUser.name"
        text="users.name"
        v-on:valid="userValidity.name = true"
        v-on:invalid="userValidity.name = false"
      />

      <VInput
        id="lastname"
        v-model="newUser.last_name"
        text="users.lastname"
        v-on:valid="userValidity.last_name = true"
        v-on:invalid="userValidity.last_name = false"
      />
      <VInput
        id="ci"
        v-model="newUser.CI"
        text="users.ci"
        :max="11"
        :min="11"
        :validation="validateID"
        v-on:valid="userValidity.CI = true"
        v-on:invalid="userValidity.CI = false"
      />
      <VInput
        id="email"
        v-model="newUser.email"
        text="users.email"
        :validation="validateEmail"
        v-on:valid="userValidity.email = true"
        v-on:invalid="userValidity.email = false"
      />

      <VInput
        id="username"
        v-model="newUser.username"
        text="users.username"
        :validation="validateUsername"
        v-on:valid="userValidity.username = true"
        v-on:invalid="userValidity.username = false"
      />
      <VInput
        id="password"
        type="password"
        v-model="newUser.password"
        text="users.password"
        v-on:valid="userValidity.password = true"
        v-on:invalid="userValidity.password = false"
      />

      <Treeselect
        v-model="newUser.fk_id_group"
        :options="groups"
        :placeholder="t('users.group')"
        :clearable="false"
        :multiple="false"
        :flat="true"
        :disable-branch-nodes="true"
        :searchable="false"
        w-25rem
        mb-1rem
        v-on:select="userValidity.fk_id_group = true"
      />

      <div class="p-dialog-footer" w-full>
        <button black-button type="button" @click="visible = false">
          {{ $t("global.cancel") }}
        </button>
        <button
          black-button
          :class="{ 'p-disabled': !isUserValid() }"
          type="submit"
        >
          {{ $t("global.add") }}
        </button>
      </div>
    </form>
  </Dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Treeselect from "vue3-treeselect";
import "vue3-treeselect/dist/vue3-treeselect.css";
import Dialog from "primevue/dialog";
import { useI18n } from "vue-i18n";
import { watch } from "vue";
import { validateEmail } from "@/common/utils/validations";
import { validateCI } from "@/common/utils/validations";
import { addUser } from "../../users";
import { validateEmptyString } from "@/common/utils/validations";
import { useSendRequest } from "@/common/utils/fetch";

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
  groups:Array
});

const { t } = useI18n();
const visible = defineModel();


const validateID = (text: string) => {
  userValidity.value.CI = false;
  newUser.value.CI = newUser.value.CI.replace(/[^0-9]/g, "");
  validateCI(text);
  let existentCI = props.users.filter((user) => user.fk_CI === text);
  if (existentCI.length > 0) throw new Error("error.existent_ci");
  userValidity.value.CI = true;
};

const validateUsername = (text: string) => {
  validateEmptyString(text);
  userValidity.value.username = false;

  let existentUsername = props.users.filter(
    (user) => user.user.username === text
  );
  if (existentUsername.length > 0) throw new Error("error.existent_username");
  userValidity.value.username = false;
};
const newUser = ref({
  CI: "",
  name: "",
  username: "",
  last_name: "",
  password: "",
  email: "",
  sex: "",
  user_type: "student",
  fk_CI: "",
  fk_id_group: null,
  deleted: 0,
});

const userValidity = ref({
  CI: false,
  name: false,
  username: false,
  last_name: false,
  password: false,
  email: false,
  fk_id_group: false,
});
const isUserValid = () => {
  let keys = Object.keys(userValidity.value);
  console.log(userValidity.value);
  for (let i = 0; i < keys.length; i++)
    if (!userValidity.value[keys[i]]) return false;

  return true;
};
watch(visible, (newValue) => {
  if (!newValue) {
    userValidity.value = {
      CI: false,
      name: false,
      username: false,
      last_name: false,
      password: false,
      email: false,
      fk_id_group: false,
    };
    newUser.value = {
      CI: "",
      name: "",
      username: "",
      last_name: "",
      password: "",
      email: "",
      sex: "",
      user_type: "student",
      fk_CI: "",
      fk_id_group: "57",
      deleted: 0,
    };
  }
});

</script>
<style>
.p-dropdown *,
.p-dropdown-item-label,
.vue-treeselect * {
  font-size: 1.5rem;
  color: black;
}

.vue-treeselect {
  border: 0.1rem solid transparent;
  border-radius: var(--bradius);
  transition: border ease 0.2s;
}
.vue-treeselect__control {
  height: 3rem;
  text-align: left;
  box-shadow: var(--shadow);
  border-radius: var(--bradius);
}

.vue-treeselect__value-container {
  height: 3rem;
}
.p-dropdown:hover,
.vue-treeselect:hover {
  border: 0.1rem solid black;
}

@media (min-width: 780px) {
  .p-dropdown,
  .vue-treeselect__control,
  .vue-treeselect__value-container {
    height: 4rem;
  }
  .p-dropdown *,
  .p-dropdown-item-label,
  .vue-treeselect__control * {
    font-size: 2rem;
  }
}
</style>
