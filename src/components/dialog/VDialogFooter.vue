<template>
  <div w-full flex  justify-center>
    <Button :label="t('global.confirm')" v-ripple @click="closeDialog()" />

  </div>

</template>
<script setup lang="ts">
import Button from "primevue/button";
import { inject } from "vue";
import { useI18n } from "vue-i18n";
const dialogRef = inject("dialogRef");
const { t }  = useI18n()
const closeDialog = () => {
  dialogRef.value.close()
};
</script>
