<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import Tag from "primevue/tag";
import { useI18n } from "vue-i18n";
import { Card } from "primevue";
import moment from 'moment';
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
    availabilityTime = lastDate.getTime() ;
  }
  return availabilityTime;
};
const availabilityTime = getAvailabilityTime();

const availabilityDate =moment(availabilityTime).format("DD/MM/YYYY"); 
</script>

<template>
  <Card class="col-span-1">
    <template #content>

    <div
      class=" h-10rem overflow-hidden  flex flex-col justify-between    ">

      <div class=" text-lg  truncate ">{{ props.test.name }}
        <div class="card mt-2 flex flex-wrap  gap-2">
          <Tag severity="warn" :value="props.test.time_duration > 0 ?
            props.test.time_duration +
            ' min' : 'Por series'" icon="pi pi-stopwatch" rounded></Tag>
          <Tag severity="info" :value="props.test.fk_id_type_test == 1 ? 'Psicométrico' : 'Personalidad'"
            icon="pi pi-file-edit" rounded></Tag>
        </div>


      </div>



      <Button w-full mt-2 v-if="!availabilityTime" :id="'execute-test-' + test.id_test + '-button'" icon="pi pi-file-edit" fluid
        :label="$t('global.execute')" h-10 @click="emit('show-dialog', props.test)" />
      <Button mt-2 v-else w-full severity="danger" :label="$t('select-test.not-available')+ availabilityDate "  disabled :id="'execute-test-' + test.id_test + '-button-disabled'">
        
        
      </Button>
    </div>
  </template>

  </Card>


</template>
