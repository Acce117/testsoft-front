<template>
  <VWhiteButton v-tooltip.right="t('execute-test.tooltips.info')" @click="visible=true"><img src="/img/info.svg" alt="info" /> </VWhiteButton>
  <Dialog> </Dialog>
  <Dialog
        v-model:visible="visible"
        modal
        :header="t('global.info')"
        style="width: 50%"
      >
        <span class="modal__long-message">
          <slot></slot>
        </span>
      </Dialog>
</template>
<script setup lang="ts">
import Dialog from "primevue/dialog";
import VWhiteButton from "./VWhiteButton.vue";
const {t} = useI18n()
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const visible = ref(false);
</script>
