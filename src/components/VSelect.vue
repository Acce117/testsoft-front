<template>

  <div w-full>
    <Field v-model="model" :name="props.name" v-slot="{ meta, errors }">
      <FloatLabel variant="on">
        <MultiSelect v-if="props.multi" filter   showClear :loading="props.loading" v-bind="{ ...$attrs }" w-full v-model="model"
          :invalid="meta.validated && !meta.valid">
          <template #footer>
            <div class="p-3 w-full">
              <Button  fluid severity="secondary" text size="small" icon="pi pi-plus" />
            </div>
          </template>
        </MultiSelect>
        <Select v-else checkmark filter    showClear :loading="props.loading" v-bind="{ ...$attrs }" w-full v-model="childModel"
          :invalid="meta.validated && !meta.valid" @change="updateModel($event.value)">
          <template #footer>
            <!-- <div class="p-3 w-full">
              <Button  fluid severity="secondary" text size="small" icon="pi pi-plus" />
            </div> -->
          </template>
        </Select>
        <label for="" flex items-center justify-center gap-2>
          <slot name="icon"></slot>{{ $t(props.label) }}
        </label>
      </FloatLabel>
      <Transition name="fast-fade">
        <small text-red v-if="meta.validated && !meta.valid">{{ errors[0]?$t(errors[0]):'' }}</small>
      </Transition>
    </Field>
  </div>
</template>

<script setup lang="ts">
import {  ref, useAttrs } from 'vue';
import { Field } from 'vee-validate';
import FloatLabel from 'primevue/floatlabel';
import Select from 'primevue/select';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
const props = defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  optionId:{type:String, default:'id'},
  loading: { type: Boolean },
  multi: { type: Boolean },
});

const options = useAttrs().options

const error = ref('error.error')
const model = defineModel();

const childModel = ref()

const updateModel =(value)=>{
  console.log(value)
  if(!value)
    model.value = undefined
  else model.value = value[props.optionId]
}

const getDefaultValue = ()=>options[0]

</script>
