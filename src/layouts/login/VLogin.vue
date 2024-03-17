<template>
  <main centered>
    <VLanguageChanger />
    <section class="login__container">
      <img src="/img/background.jpg" alt="persona ejecutando un test" />
      <div class="login">
        <div class="login__header" centered>
          <img src="/img/logo.png" w-10rem />
          <h1 text-white  font-size-2rem  anim-slide-in-1 md:text-black md:font-size-2.5rem>{{ $t("login.title") }}</h1>
        </div>
        <form
          action=""
          @submit.prevent="sendCredentials()"
          centered
          gap-3rem
          flex-col
          h-30rem
        >
          <div class="login__input">
            <input
              id="user-input"
              type="text"
              required
              v-model="credentials.username"
              shadow-box
            />
            <label for="user-input"
              ><img src="/img/user.svg" />{{ $t("login.user") }}</label
            >
          </div>
          <div class="login__input">
            <input
              id="password-input"
              type="password"
              required
              v-model="credentials.password"
              shadow-box
            />
            <label for="password-input"
              ><img src="/img/password.svg" />{{ $t("login.password") }}</label
            >
          </div>
          <button
            black-button
            mt-2rem
            w-15rem
            h-5rem
            font-size-1.6rem
            class="p-riple"
            type="submit"
            v-ripple
          >
            <span v-if="!loading">{{ $t("login.login") }}</span>
            <VLoading v-else />
          </button>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/common/login";
import VLanguageChanger from "@/components/VLanguageChanger.vue";
const router = useRouter();
const loading = ref(false);
import { useToast } from "primevue/usetoast";
import {
  userStore,
  type UserInterface,
} from "@/modules/security/store/user-store";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const toast = useToast();
const credentials = ref({
  username: "",
  password: "",
});

async function sendCredentials() {
  loading.value = true;
  const response = login(credentials.value);
  watch(response.loading, () => {
    if (!response.error.value) {
      userStore().$patch(response.result.value as unknown as UserInterface);
      sessionStorage.setItem("user", JSON.stringify(response.result.value));
      router.push("/");
      toast.removeAllGroups();
    } else {
      loading.value = false;
      toast.add({
        severity: "error",
        summary: "Error",
        detail: t('login.error') ,
        life: 3000,
      });
    }
  });
}

window.scrollTo(0, 0);
</script>

<style>
.login__container {
  width: 31rem;
  height: 50rem;
  display: flex;
  overflow: hidden;
  background: transparent;
  box-shadow: none;
}

.login__container > img {
  display: none;
}

.login {
  position: relative;
  width: 100%;
  height: 100%;
  animation: 0.5s fade-in;
  overflow: hidden;
  flex-direction: column;
  background-color: transparent;
  box-shadow: none;
}

.login__input {
  position: relative;
}

.login__input input {
  outline: none;
  border: none;
  height: 3rem;
  font-size: 1.5rem;
  padding: 1rem;
}

.login__input label {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  position: absolute;
  top: 0.2rem;
  left: 1rem;
  transition: all ease 0.2s;
  color: black;
  user-select: none;
  pointer-events: none;
  animation: 1s fade-in;
}

.login__input label img {
  transition: all ease 0.2s;
  width: 2rem;
}

.login__input input:valid ~ label,
.login__input input:focus ~ label {
  color: white;
  top: -2.8rem;
  font-size: 1rem;
}

.login__input input:valid ~ label img,
.login__input input:focus ~ label img {
  filter: invert();
  transform: scale(0.8);
}

.login__header {
  height: 20rem;
  gap: 3rem;
  flex-direction: column;
}



@media (min-width: 768px) {
  .login__container > img {
    display: block;
    width: 42rem;
  }

  .login__container {
    background-color: white;
    width: 75rem;
    box-shadow: var(--shadow);
    border-radius: var(--bradius);
  }

  .login__input label,
  .login__input,
  .login form button {
    font-size: 2rem;
  }

  .login__input input {
    height: 4rem;
  }

  .login__input input:valid ~ label,
  .login__input input:focus ~ label {
    font-size: 1.5rem;
    color: black;
  }

  .login__input input:valid ~ label img,
  .login__input input:focus ~ label img {
    filter: none;
  }
}
</style>
