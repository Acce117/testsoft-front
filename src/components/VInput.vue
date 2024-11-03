<template>

  <div w-full> 
    <Field v-model="model" :name="props.name" v-slot="{  meta, errors }">
      <FloatLabel variant="on">
        <InputText v-bind="{ ...$attrs }" w-full v-model="model" :invalid="meta.validated && !meta.valid" />
        <label for="" flex items-center justify-center gap-2>
          <slot name="icon"></slot>{{ $t(props.label) }}
        </label>
      </FloatLabel>
      <Transition name="fast-fade">
        <small text-red v-if="meta.validated && !meta.valid">{{ errors[0] }}</small>
      </Transition>
    </Field>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Field } from 'vee-validate';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
const props = defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },

});
const error = ref('error.error')
const model = defineModel();

</script>
