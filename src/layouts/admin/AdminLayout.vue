<script setup lang="ts">
import VNavbar from '@/components/navbar/VNavbar.vue';
import AdminNavbar from './components/AdminNavbar.vue';
import AdminSideBar from './components/AdminSideBar.vue';
import { ref } from 'vue';
import Drawer from 'primevue/drawer';
import Button from 'primevue/button';

const visible=ref(false)
</script>

<template>
  
  <main bg-sky-300 w-screen h-screen flex anim-fade-in-1>
    <div class="hidden xl:block">
      <AdminSideBar />

    </div>

    <div class="card flex justify-center">
      <Drawer v-model:visible="visible" class="!w-fit">
        <template #container>
          <AdminSideBar />

        </template>

      </Drawer>
      
    </div>



    <section h-screen flex flex-col w-full>
      <AdminNavbar>
        <template #sidebar-button >
          <div xl:hidden block>
            <Button  icon="pi pi-arrow-right" h-fit severity="secondary" @click="visible = true" />

          </div>
        </template>
      </AdminNavbar>
      <div overflow-auto m3  h-full>

        <RouterView></RouterView>
      </div>
    </section>


  </main>

</template>