<template>
  <main>
    <div class="login">
      <span class="screen__background"></span>
      <img src="/img/logo.png" class="login__logo" />
      <h2>Bienvenido a Testsoft</h2>
      <form action="" @submit.prevent="login()">
        <div class="login__input">
          <input id="user-input" type="text" required v-model="credentials.username"/>
          <label for="user-input"><img src="/img/user.svg" />Usuario</label>
        </div>
        <div class="login__input">
          <input id="password-input" type="password" required v-model="credentials.password"/>
          <label for="password-input"
            ><img src="/img/password.svg" />Contraseña</label
          >
          </div>
          <button class="black-button" type="submit">Iniciar sesión</button>
        </form>
      </div>
    </main>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from "vue-router";

import { User } from '../../modules/security/classes/user';
import type { LoginForm } from "@/modules/security/interfaces/loginForm";
const router = useRouter();

const credentials = ref<LoginForm>({
  username: '',
  password: ''
})

async function login(){
  try{
    const user = await User.login(credentials.value);
    
    router.push('/')
  }catch(err){
    console.log(err);
  }
}

window.scrollTo(0,0)

</script>

<style>
.login {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30rem;
  height: 50rem;
  padding: 2rem;
  background-color: white;
  border-radius: 1.5rem;
  overflow: hidden;
  color: white;
  box-shadow: 0 0 0.5rem 0.5rem rgba(0, 0, 0, 0.3);
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
.login__remember {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  gap: 1rem;
  cursor: pointer;
  width: 15rem;
}

.login__remember input {
  display: none;
}

.login__remember span {
  display: inline-block;
  position: relative;
  font-size: 1rem;
  height: 3rem;
  width: 3rem;
  background: black;
  border-radius: 100%;
  transition: all 0.2s;
}

.login__remember span {
  border: solid white;
}

.login__remember input:checked ~ span {
  box-shadow: 0 0 1.5rem 0 white;
}

.login__remember input:checked ~ span:after {
  opacity: 1;
}

.login__remember span:after {
  content: "";
  position: absolute;
  border: solid white;
  border-width: 0 0.3rem 0.3rem 0;
  transform: rotate(45deg);
  width: 1rem;
  height: 2rem;
  left: 1rem;
  opacity: 0;
  transition: 0.3s ease;
}

.login__logo {
  margin-top: 2rem;
  width: 30%;
}
.login h2 {
  font-size: 2rem;
}
.login button {
  width: 12rem;
  margin-left: 15rem;
  font-size: 1.6rem;
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
  .login button {
    width: 15rem;
    margin-left: 22rem;
    font-size: 1.8rem;
  }
}
</style>
@/layouts/login/classes/login
@/modules/security/interfaces/loginForm@/modules/security/types/loginForm