<template>
  <div class="login">
    <span class="screen__background"></span>
    <img src="/img/logo.png" />
    <h2>Bienvenido a Testsoft</h2>
    <form action="" @submit="login()"  >
      <div class="login__input">
        <input id="user-input" type="text" required />
        <label for="user-input"><img src="/img/user.svg">Usuario</label>
      </div>
      <div class="login__input">
        <input id="password-input" type="password" required />
        <label for="password-input"><img src="/img/password.svg">Contraseña</label>
      </div>
      <label for="remember" class="login__remember">
        <input id="remember" type="checkbox" />
        <span></span>Recordarme</label
      >
      <button type="submit" >Iniciar sesión</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const login = () => {
  router.push('/')
}
</script>
<style>
.login {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40rem;
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
.login__input input {
  width: 25rem;
  outline: none;
  border: none;
  border-radius: 1.5rem;
  height: 4rem;

  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  font-size: 2rem;
  padding: 1rem;
}
.login__input label {
    display: flex;
    align-items: center;
    gap: 1rem;
  font-size: 2rem;

  position: absolute;
  top: 0.2rem;
  left: 1rem;
  transition: all ease 0.2s;
  color: black;
  user-select: none;
  pointer-events: none;
}
.login__input label img{
    width: 2rem;
}
.login__input input:valid ~ label,
.login__input input:focus ~ label {
  color: white;
  top: -2.8rem;
  left: 2rem;
  font-size: 1.5rem;
}
.login form {
  display: flex;
  gap: 3rem;
  flex-direction: column;
  z-index: 1;
}
.login__remember {
  display: flex;
  align-items: center;
  font-size: 2rem;
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

.login__remember label {
  color: white;
  font-size: 2rem;
}
.login img {
  width: 30%;
  z-index: 1;
}
.login h2 {
  font-size: 2.7rem;
  z-index: 1;
}
.login button {
  z-index: 1;
  margin: 0 60%;
}

.screen__background {
  transform: rotate(45deg);
  position: absolute;
  height: 50rem;
  width: 50rem;
  left: -22rem;
  background: rgba(0, 0, 0);
  border-radius: 0 7rem 0 0;
}
</style>
