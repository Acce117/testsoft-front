<script setup lang="ts">
import VNavbar from '@/components/navbar/Navbar.vue';
import AdminNavbar from './components/AdminNavbar.vue';
import AdminSideBar from './components/AdminSideBar.vue';
import { ref } from 'vue';
import Drawer from 'primevue/drawer';
import Button from 'primevue/button';
import VUsersManagement from '@/modules/management/users/views/VUsersManagement.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const visible=ref(false)
const products = ref();
</script>

<template>
  
  <main class="gradient-background" w-screen h-screen flex anim-fade-in-1>
     <aside class="hidden xl:flex ">
      <AdminSideBar />

    </aside>

    <aside class="card flex justify-center">
      <Drawer v-model:visible="visible" class="!w-fit">
        <template #container>
          <AdminSideBar @close="visible=false" />

        </template>

      </Drawer>
      
    </aside>

    

    <section h-full w-full flex-col flex gap-2 p-2 >
      <AdminNavbar >
        <template #sidebar-button >
          <div xl:hidden block>
            <Button  icon="pi pi-bars" h-fit severity="secondary" @click="visible = true" />

          </div>
        </template>
      </AdminNavbar>
      <div h-full overflow-auto max-w-full rounded-xl  w-full>
        <RouterView></RouterView>
      </div>

    </section>


  </main>

</template>