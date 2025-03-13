<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import Tag from "primevue/tag";
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const props = defineProps({
  test: { type: Object, required: true },
});

const emit = defineEmits(['show-dialog'])


const isAvailable = ref(false);
const now = new Date();
const getAvailabilityTime = () => {
  let availabilityTime = 0;
  if (props.test.test_apps.length > 0) {
    const lastDate = new Date(props.test.test_apps[props.test.test_apps.length - 1].date);
    lastDate.setFullYear(lastDate.getFullYear() + props.test.recurring_time);
    availabilityTime = lastDate.getTime() - now.getTime();
  }
  return availabilityTime;
};
const availabilityTime = getAvailabilityTime();
</script>

<template>
  <div
    class="border  h-15rem shadow-lg border-1 border-solid border-slate-200 bg-white overflow-hidden flex flex-col justify-between rounded-xl m-2 mt-4  p-4">

    <div class=" font-semibold text-lg text-secondary  overflow-auto">{{ props.test.name }}
      <div class="card mt-2 flex flex-wrap  gap-2">
        <Tag severity="secondary" :value="props.test.time_duration > 0 ?
          props.test.time_duration +
          ' min' : 'Por series'" icon="pi pi-stopwatch" rounded></Tag>
        <Tag severity="secondary" :value="props.test.fk_id_type_test == 1 ? 'Psicométrico' : 'Personalidad'"
          icon="pi pi-file-edit" rounded></Tag>
      </div>


    </div>



    <Button v-if="!availabilityTime" :id="'execute-test-'+test.name+'-button'" icon="pi pi-file-edit"  fluid :label="$t('global.execute')" h-10
      @click="emit('show-dialog', props.test)" />
    <Button v-else severity="secondary"  disabled :id="'execute-test-'+test.name+'-button-disabled'" ><vue-countdown :time="availabilityTime" v-slot="{ days, hours, minutes, seconds }"
        @end="isAvailable = true">
        
        <div >
          {{ $t('select-test.not-available') }}:
          <span v-if="days > 0">{{ days }} {{ $t('global.days') }}, </span>
          <span v-if="hours > 0">{{ hours }} {{ $t('global.hours') }}, </span>
          <span v-if="minutes > 0">{{ minutes }} {{ $t('global.minutes') }}</span>
        </div>
      </vue-countdown></Button>
  </div>
 
</template>

