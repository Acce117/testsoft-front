<template>
  <main class="centered">
    <div class="login__container box-shadow-box">
      <img src="/img/background.jpg" alt="persona ejecutando un test" />
      <div class="login box-shadow-box">
        <div class="login__header centered">
          <img src="/img/logo.png" class="login__logo" />
          <h1>Bienvenido a TestSoft</h1>
        </div>
        <form action="" @submit.prevent="sendCredentials()" class="centered">
          <div class="login__input">
            <input id="user-input" type="text" required v-model="credentials.username" class="box-shadow-box" />
            <label for="user-input"><img src="/img/user.svg" />Usuario</label>
          </div>
          <div class="login__input">
            <input id="password-input" type="password" required v-model="credentials.password" class="box-shadow-box" />
            <label for="password-input"><img src="/img/password.svg" />Contraseña</label>
          </div>
          <button class="black-button p-riple" type="submit" v-ripple>
            <span v-if="!loading">Iniciar Sesión</span>
            <VLoading v-else />
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/common/login";
const router = useRouter();
const loading = ref(false);
import { useToast } from "primevue/usetoast";
import { userStore, type UserInterface } from "@/modules/security/store/user-store";
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
      sessionStorage.setItem('user', JSON.stringify(response.result.value));
      router.push("/");
      toast.removeAllGroups();
    }
    else {
      loading.value = false;
      toast.add({
        severity: "error",
        summary: "Error",
        detail: 'Inicio de sesión inválido',
        life: 3000,
      });
    }
  })
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

.login__container>img {
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

.login__input input:valid~label,
.login__input input:focus~label {
  color: white;
  top: -2.8rem;
  font-size: 1rem;
}

.login__input input:valid~label img,
.login__input input:focus~label img {
  filter: invert();
  transform: scale(0.8);
}

.login form {
  gap: 3rem;
  flex-direction: column;

  height: 30rem;
}

.login form button {
  margin-top: 2rem;
  width: 15rem;
  height: 5rem;
  font-size: 1.6rem;
}

.login__logo {
  width: 10rem;
}

.login__header {
  height: 20rem;
  gap: 3rem;
  flex-direction: column;
}

.login h1 {
  color: white;
  font-size: 2rem;
  animation: 1s slide-in;
}

@media (min-width: 768px) {
  .login__container>img {
    display: block;
    width: 42rem;
  }

  .login__container {
    background-color: white;
    width: 75rem;
  }

  .login h1 {
    color: black;
    font-size: 2.5rem;
  }

  .login__remember,
  .login__input label,
  .login__input,
  .login form button {
    font-size: 2rem;
  }

  .login__input input {
    height: 4rem;
  }

  .login__input input:valid~label,
  .login__input input:focus~label {
    font-size: 1.5rem;
    color: black;
  }

  .login__input input:valid~label img,
  .login__input input:focus~label img {
    filter: none;
  }
}
</style>
