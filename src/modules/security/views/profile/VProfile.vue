<script setup lang="ts">
import { useRouter } from "vue-router";
import { userStore } from "../../store/user-store";
import Dialog from "primevue/dialog";
import { ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
const confirm = useConfirm();
const router = useRouter();
const logOut = () => {
  visible.value = false;
  user.$reset();
  sessionStorage.removeItem('user');
  router.push("/login");
};

const user = userStore();
const visible = ref(false);

const logOutConfirm = ()=>{
  confirm.require({
    message: "¿Desea cerrar sesión?",
    header: "Salir",
    rejectLabel: "Cancelar",
    acceptLabel: "Aceptar",
    accept: () => {
      logOut();
    },
  })
}

</script>
<template>
  <h2 class="page-title">Mi perfil</h2>
  <div class="profile">
    <span>Nombre: {{ user.username }}</span>
    <span><strong>Carnet de Identidad:</strong> {{ user.ci }}</span>
    <span v-if="user.group">Grupo: {{ user.group }}</span>
    <span>Rol: {{ user.role }}</span>
    <span v-if="user.userType">Tipo de Usuario: {{ user.userType }}</span>
    <button class="black-button" @click="logOutConfirm()">
      Cerrar Sesión
    </button>
  </div>
</template>
<style>
.profile {
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 2rem 3rem;
  gap: 2rem;
  font-size: 1.5rem;
  text-wrap: wrap;
  animation: fade-in 1s;
}

.profile button {
  width: fit-content;
}

@media (min-width: 480px) {}

@media (min-width: 768px) {
  .profile {
    font-size: 2rem;
  }

  .profile button {
    font-size: 2rem;
  }
}
</style>
