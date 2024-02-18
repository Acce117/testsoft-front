<template>
  <button
    class="p-confirm-dialog-reject p-button-text"
    type="button"
    aria-label="Aceptar"
    data-pc-name="rejectbutton"
    data-pc-section="root"
    @click="closeDialog()"
  >
    <span class="p-button-label" data-pc-section="label">Aceptar</span>
  </button>
</template>
<script setup lang="ts">
const emit = defineEmits(["accept"]);
import { inject } from "vue";
const dialogRef = inject("dialogRef");
const closeDialog = () => {
  dialogRef.value.close()
};
</script>
