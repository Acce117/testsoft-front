<script setup lang="ts">
import { inject, provide, ref } from "vue";
import VLanguageChanger from "@/components/VLanguageChanger.vue";
import { useI18n } from "vue-i18n";
import { siteStore } from "@/common/site/siteStore";
import Button from "primevue/button";
import VInput from "@/components/VInput.vue";
import { Form } from "vee-validate";
import { signUpSchema } from "./signUpSchema";
import { User } from "@/modules/management/users/models/user.model";
import VRadioButton from "@/components/VRadioButton.vue";
import VSelect from "@/components/VSelect.vue";
import { sendRequest } from "@/common/utils/sendRequest";
import { useMutation } from "@tanstack/vue-query";
import { useToast } from "primevue/usetoast";
const { t } = useI18n();
const toast = useToast()
const login = siteStore().useLogin();

const canValidate = ref(false)
provide("canValidate", canValidate)
const user = ref(new User())

const { mutate: signUp, isPending } = useMutation({
  mutationKey: [`sign-up`],
  mutationFn: async (value: object) => {
    const body = {
      user: { ...value },
      group: [
        {
          name_group: value.name_group
        },
      ],
    };
    console.log(body)
    delete body.user.name_group;
    return await sendRequest({
      method: "POST",
      url: `${import.meta.env.VITE_API_PATH}/sign_in`,
      body: body,
    });
  },
  onSuccess: async () => {

    login.login({ username: user.value.username, password: user.value.password })
  },
  onError: (error) => {
    console.log(error)
    toast.add({ severity: 'error', summary: t('global.operation_failed'), detail: t('sign-up.error'), life: 5000 });
  }
})



window.scrollTo(0, 0);
</script>


<template>
  <main centered>
    <!--<div fixed left-0.5rem top-0.5rem>
      <VLanguageChanger />
    </div>-->

    <section flex overflow-hidden h-115 w-xs bg-white shadow-xl justify-center rounded-2xl border-solid border-1
      border-slate-200>
      <div overflow-hidden pa-4>
        <div flex flex-col w-full>
          <h1 text-2xl h-20 anim-slide-in-1 w-full m-0 font-bold text-primary>
            {{ $t("sign-up.title") }}
          </h1>
        </div>
        <Form @submit="signUp" centered gap-27px flex-col :validation-schema="signUpSchema">

          <div h-60 overflow-auto gap-27px flex flex-col>

            <VInput v-model="user.CI" name="CI" mask="99999999999" label="user.ci" />
            <VRadioButton label="user.sex" v-model="user.sex" name="sex" :options="['F', 'M']" />

            <VInput v-model="user.name" name="name" label="user.name" />

            <VInput v-model="user.last_name" name="last_name" label="user.last_name" />

            <VInput v-model="user.username" name="username" label="user.username" />
            <VInput v-model="user.password" password name="password" label="user.password" />

            <VInput v-model="user.email" name="email" label="user.email" />
            <VSelect v-model="user.country_id" name="country_id" label="user.country"
              :options="[{ country_id: 2, name: 'Cuba' }]" optionLabel="name" optionId="country_id" />
            <VInput v-model="user.name_group" name="name_group" label="group.name_group" />

          </div>

                          <Button w-full type="submit" :loading="login.loading || isPending" :label="t('sign-up.sign-up')"/>

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
