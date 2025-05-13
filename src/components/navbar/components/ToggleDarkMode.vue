<template>
    <div>


        <Button icon="pi pi-sun" class="w-8" severity="secondary" variant="outlined" @click="toggleDarkMode()" />
    </div>
</template>
<script setup lang="ts">
import { Button } from 'primevue';


function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
}

</script>