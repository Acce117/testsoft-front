<template>

  <div :class="$attrs.class" min-w-20rem text-left flex flex-col gap-4 text-slate-600>
    <Field v-model="model" :name="props.name" v-slot="{ meta, errors }">
      <label for="" >
        <slot name="icon"></slot>{{ $t(props.label) }}
      </label>
      <div  w-full flex gap-4 flex-wrap >

        <div flex items-center justify-center gap-2 v-for="option in props.options" :key="option">
          <RadioButton  :inputId="option" :value="option" v-bind="{ ...$attrs }" v-model="model"
            :invalid="meta.validated && !meta.valid" />
          <label  :for="option" flex items-center justify-center gap-2>
            {{ option }}
          </label>
        </div>
      </div>


      <Transition name="fast-fade">
        <small text-red v-if="meta.validated && !meta.valid">{{ errors[0]?$t(errors[0]):'' }}</small>
      </Transition>
    </Field>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Field } from 'vee-validate';
import RadioButton from 'primevue/radiobutton';
const props = defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  options: { type: Array, required: true }
});
const error = ref('error.error')
const model = defineModel();

</script>
