<script setup lang="ts">
import VNavbar from '@/components/navbar/VNavbar.vue';
import AdminNavbar from './components/ExecutorNavbar.vue';
import AdminSideBar from './components/ExecutorSideBar.vue';
import { ref } from 'vue';
import Drawer from 'primevue/drawer';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ExecutorSideBar from './components/ExecutorSideBar.vue';
import ExecutorNavbar from './components/ExecutorNavbar.vue';

const visible=ref(false)
</script>

<template>
  
  <main class="gradient-background" w-screen h-screen flex anim-fade-in-1>
     <aside class="hidden xl:flex ">
      <ExecutorSideBar />

    </aside>

    <aside class="card flex justify-center">
      <Drawer v-model:visible="visible" class="!w-fit">
        <template #container>
          <ExecutorSideBar @close="visible=false" />

        </template>

      </Drawer>
      
    </aside>

    

    <section h-full w-full flex-col flex gap-2 p-2 >
      <ExecutorNavbar >
        <template #sidebar-button >
          <div xl:hidden block>
            <Button  icon="pi pi-bars" h-fit severity="secondary" @click="visible = true" />

          </div>
        </template>
      </ExecutorNavbar>
      <div h-full overflow-auto max-w-full rounded-xl  w-full>
        <RouterView></RouterView>
      </div>

    </section>


  </main>

</template>