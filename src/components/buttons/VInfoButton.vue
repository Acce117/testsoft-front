<template>
  <VBlackButton v-if="props.black"
    v-tooltip.left="t('execute-test.tooltips.info')"
    @click="visible = true"
    ><img src="/img/info.svg" alt="info" />
  </VBlackButton>
  <VWhiteButton v-else
    v-tooltip.left="t('execute-test.tooltips.info')"
    @click="visible = true"
    ><img src="/img/info.svg" alt="info" />
  </VWhiteButton>
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
const props =defineProps({
  black:{
    type:Boolean,
    default:false
  }
})
import Dialog from "primevue/dialog";
const { t } = useI18n();
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import type VBlackButton from "./VBlackButton.vue";
const visible = ref(false);
</script>
