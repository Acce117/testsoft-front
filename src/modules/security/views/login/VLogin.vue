<script setup lang="ts">
import { provide, ref } from "vue";
import { useI18n } from "vue-i18n";
import { siteStore } from "@/common/site/siteStore";
import VInput from "@/components/VInput.vue";
import { Form } from "vee-validate";
import { loginSchema } from "./loginSchema";
import { Button, Card, Dialog } from "primevue";
import useEvents from "@/common/utils/useEvents";
import VSelect from "@/components/VSelect.vue";
import { selectGroupSchema } from "./selectGroupSchema";
const { t } = useI18n();

const credentials = ref({
  username: "",
  password: "",
});

const selectedGroup = ref()
const temporalToken = ref()
const visible = ref(false)
const groups = ref([])



const login = siteStore().useLogin();




const onSubmitLogin = () => {
  login.login(credentials.value)
}
const onSubmitSelectGroup = () => {
  login.selectGroup(selectedGroup.value, temporalToken.value)
}
useEvents().addListener("login", (event: CustomEventInit) => {
  visible.value = true
  groups.value = event.detail.groups
  temporalToken.value = event.detail.temporalToken
});

const canValidate = ref(false)
provide("canValidate", canValidate)

window.scrollTo(0, 0);
</script>


<template>
  <main centered class="gradient-background">


    <Card anim-slide-in-from-bottom-1 >
      <template #content>

        <div overflow-hidden flex h-full flex-col anim-fade-in-1>
          <div flex items-center flex-col mb-2>
            <img src="/img/logo.png" w-6rem h-20 mb-2 />
            <h1 text-3xl h-20 w-full m-0 font-bold text-center text-primary>
              {{ t("title") }}
            </h1>
          </div>
          <Form @submit="onSubmitLogin" flex h-fit gap-8 justify-between flex-col :validation-schema="loginSchema">

            <div flex flex-col gap-8>

              <VInput h-10 name="username" id="user-input" :max="8" v-model="credentials.username" :label="t('user')">
                <template #icon>
                  <span class="pi pi-user"></span>

                </template>
              </VInput>
              <VInput h-10 name="password" id="password-input" :max="8" password v-model="credentials.password"
                :label="t('password')">
                <template #icon>
                  <i class="pi pi-lock"></i>

                </template>

              </VInput>
            </div>



            <Button w-full type="submit" id="login-button" :label="t('login')" :loading="login.loading" />
            <!-- <RouterLink  text-primary to="/sign-up">{{ $t('login.sign-up') }}</RouterLink> -->
          </Form>
        </div>
      </template>

    </Card>
    <Dialog v-model:visible="visible" modal :header="'Seleccionar grupo'" class="w-4/5 max-w-50rem min-w-25rem">
      <Form @submit="onSubmitSelectGroup" :validation-schema="selectGroupSchema">
        <div class="dialog-form">
          <VSelect w-full v-model="selectedGroup" optionId="id_group" name="group"
            label="Seleccione el grupo donde desea trabajar" :options="groups" optionLabel="name_group" />

        </div>

        <div class="dialog-footer">
          <Button type="button" :label="$t('global.cancel')" severity="secondary" @click="visible = false"></Button>

          <Button w-8rem type="submit" :loading="login.loading" :label="t('global.select')" />
        </div>
      </Form>
    </Dialog>
  </main>
</template>



<style>
.title {
  background: -webkit-linear-gradient(45deg, #96dcff, #2388bb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
<i18n lang="json">{
  "es": {
    "user": "Usuario",
    "password": "Contraseña",
    "title": "Bienvenido a TestSoft",
    "login": "Iniciar Sesión",
    "sign-up": "Regístrate como nuestro cliente"
  },
  "en": {
    "user": "User",
    "password": "Password",
    "title": "Welcome to TestSoft",
    "login": "Log In",
  }
}</i18n>
