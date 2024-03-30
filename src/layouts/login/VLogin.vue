<template>
  <main centered>
    <div fixed left-0.5rem top-0.5rem>
      <VLanguageChanger />
    </div>

    <section class="login__container">
      <img src="/img/background.jpg" alt="persona ejecutando un test" />
      <div class="login">
        <div class="login__header" centered>
          <img src="/img/logo.png" w-10rem />
          <h1
            text-white
            font-size-2rem
            anim-slide-in-1
            md:text-black
            md:font-size-2.5rem
          >
            {{ $t("login.title") }}
          </h1>
        </div>
        <form
          action=""
          @submit.prevent="login.login(credentials)"
          centered
          gap-3rem
          flex-col
          h-30rem
        >
          <VInput
            id="user-input"
            v-model="credentials.username"
            text="login.user"
          >
            <img src="/img/user.svg" />
          </VInput>
          <VInput
            id="password-input"
            type="password"
            v-model="credentials.password"
            text="login.password"
            ><img src="/img/password.svg" />
          </VInput>

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
            <span v-if="!login.loading">{{ $t("login.login") }}</span>
            <VLoading v-else />
          </button>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VLanguageChanger from "@/components/VLanguageChanger.vue";
import { useI18n } from "vue-i18n";
import { siteStore } from "@/common/site/siteStore";
const { t } = useI18n();

const credentials = ref({
  username: "",
  password: "",
});

const login = siteStore().useLogin();

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
