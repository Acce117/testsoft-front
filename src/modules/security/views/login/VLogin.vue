<script setup lang="ts">
import { inject, provide, ref } from "vue";
import VLanguageChanger from "@/components/VLanguageChanger.vue";
import { useI18n } from "vue-i18n";
import { siteStore } from "@/common/site/siteStore";
import Button from "primevue/button";
import VButton from "@/components/VButton.vue";
import VInput from "@/components/VInput.vue";
import { Form } from "vee-validate";
import { loginSchema } from "./loginSchema";
const { t } = useI18n();

const credentials = ref({
  username: "",
  password: "",
});

const login = siteStore().useLogin();
const canValidate = ref(false)
provide("canValidate", canValidate)

window.scrollTo(0, 0);
</script>


<template>
  <main centered>
    <!--<div fixed left-0.5rem top-0.5rem>
      <VLanguageChanger />
    </div>-->

    <section flex overflow-hidden w-xs bg-white shadow-xl rounded-2xl>
      <div overflow-hidden pa-4>
        <div flex flex-col mb-2rem>
          <img src="/img/logo.png" w-5rem />
          <h1 text-3xl anim-slide-in-1 m-0 font-bold text-primary>
            {{ $t("login.title") }}
          </h1>
        </div>
        <Form @submit="login.login(credentials)" centered gap-27px flex-col :validation-schema="loginSchema">


          <VInput name="username" id="user-input" :max="8" v-model="credentials.username" label="login.user">
            <template #icon>
              <span class="pi pi-user"></span>

            </template>
          </VInput>
          <VInput name="password" id="password-input" :max="8" type="password" v-model="credentials.password"
            label="login.password">
            <template #icon>
              <i class="pi pi-lock"></i>

            </template>

          </VInput>

          <VButton w-full :disabled="login.loading" type="submit">
            <span v-if="!login.loading">{{ $t("login.login") }} <span class="pi pi-arrow-right"></span></span>
            <VLoading v-else />
          </VButton>
        </Form>
      </div>
    </section>
  </main>
</template>



<style>
.title {
  background: -webkit-linear-gradient(45deg, #96dcff, #2388bb);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
