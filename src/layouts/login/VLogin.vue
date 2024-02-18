<template>
  <main>
    <div class="login">
      <span class="screen__background"></span>
      <img src="/img/logo.png" class="login__logo" />
      
      <form action="" @submit.prevent="sendCredentials()">
        <h2>Bienvenido a Testsoft</h2>
        <div class="login__input">
          <input
            id="user-input"
            type="text"
            required
            v-model="credentials.username"
          />
          <label for="user-input"><img src="/img/user.svg" />Usuario</label>
        </div>
        <div class="login__input">
          <input
            id="password-input"
            type="password"
            required
            v-model="credentials.password"
          />
          <label for="password-input"
            ><img src="/img/password.svg" />Contraseña</label
          >
        </div>
        <button class="black-button" type="submit">
          <span v-if="!loading">Iniciar Sesión</span> <VLoading v-else />
        </button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/common/login";
const router = useRouter();
const loading = ref(false);
import { useToast } from "primevue/usetoast";
const toast = useToast();
const credentials = ref({
  username: "",
  password: "",
});

async function sendCredentials() {
  try {
    loading.value = true;
    await login(credentials.value)
    router.push("/");
    toast.removeAllGroups()
  } catch (err) {
    loading.value = false;
    toast.add({
          severity: "error",
          summary: "Error",
          detail: 'Inicio de sesión inválido',
          life: 3000,
        });
    console.log(err);
  }
}

window.scrollTo(0, 0);
</script>

<style>
.login {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 50rem;
  padding: 2rem;
  gap: 6rem;
  background-color: white;
  border-radius: 1.5rem;
  overflow: hidden;
  color: white;
  animation: 0.5s fade-in;
}
.login__input {
  position: relative;
}
.screen__background ~ * {
  position: relative;
  z-index: 1;
}
.login__input input {
  width: 70%;
  outline: none;
  border: none;
  border-radius: 1.5rem;
  height: 3rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
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
  animation: 1s slide-in;
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
.login form {
  display: flex;
  gap: 3rem;
  flex-direction: column;
}
.login form button {
  width: 11rem;
  height: 5rem;
  margin-left: 15rem;
  font-size: 1.4rem;
  margin-top: 8rem;
}
.login form button img {
  filter: invert();
}
.login form button:active img {
  filter: none;
}

.login__logo {
  margin-top: 2rem;
  width: 30%;
}
.login h2 {
  font-size: 2rem;
  animation: 1s slide-in;
}

.screen__background {
  transform: rotate(45deg);
  position: absolute;
  height: 50rem;
  width: 50rem;
  left: -28rem;

  background: rgba(0, 0, 0);
  border-radius: 8rem;
}
@media (min-width: 768px) {
  .login {
    width: 40rem;
    gap: 3rem;
  }
  .screen__background {
    left: -22rem;
  }
  .login h2 {
    font-size: 2.7rem;
  }
  .login__remember,
  .login__input label,
  .login__input {
    font-size: 2rem;
  }
  .login__input input {
    height: 4rem;
  }
  .login__input input:valid ~ label,
  .login__input input:focus ~ label {
    font-size: 1.5rem;
  }
  .login form button {
    width: 12rem;
    margin-left: 23rem;
    font-size: 1.6rem;
    margin-top: 4rem;
  }
}
</style>
