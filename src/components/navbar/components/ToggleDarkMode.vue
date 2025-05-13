<template>
  <div>
    <Button 
      :icon="darkMode ? 'pi pi-sun' : 'pi pi-moon'" 
      class="w-8" 
      severity="secondary" 
      variant="outlined" 
      @click="toggleDarkMode()"
      v-tooltip="t(darkMode ? 'light' : 'dark')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Button } from 'primevue';
import { useI18n } from 'vue-i18n';

const darkMode = ref<boolean>(false);
const {t}=useI18n()

onMounted(() => {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode !== null) {
    darkMode.value = JSON.parse(savedMode);
    updateDarkClass();
  }
});

function toggleDarkMode() {
  darkMode.value = !darkMode.value;
  localStorage.setItem('darkMode', JSON.stringify(darkMode.value));
  updateDarkClass();
}

function updateDarkClass() {
  if (darkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
</script>

<i18n lang="json">{
    "es": {
        "dark":"Modo oscuro",
        "light":"Modo claro"
    },
    "en": {
        "of":"Dark mode",
        "to":"Light mode"
    }
}</i18n>