<script setup lang="ts">
import { useRouter } from "vue-router";
import { userStore } from "../../store/user-store";
import Dialog from "primevue/dialog";
import { ref } from "vue";

const router = useRouter();
const logout = () => {
  visible.value = false;
  user.$reset();
  router.push("/login");
};

const user = userStore();
const visible = ref(false);

</script>
<template>
  <h2 class="page-title">Mi perfil</h2>
  <div class="profile">
    <span>Nombre: {{ user.username }}</span>
    <span><strong>Carnet de Identidad:</strong> {{ user.ci }}</span>
    <span v-if="user.group">Grupo: {{ user.group }}</span>
    <span>Rol: {{ user.role }}</span>
    <span v-if="user.userType">Tipo de Usuario: {{ user.userType }}</span>

    <button class="black-button" @click="visible = true">
      Cerrar Sesión
    </button>
  </div>

  <Dialog v-model:visible="visible" modal header="Sesión" class="modal box-shadow-box"><span
      class="modal__background-shape"></span>
    <span class="modal__message">Desea cerrar sesión?</span>
    <div class="modal__buttons">
      <button class="black-button" @click="logout()">Aceptar</button>
      <button class="black-button" @click="visible = false">Cancelar</button>
    </div>
  </Dialog>
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
