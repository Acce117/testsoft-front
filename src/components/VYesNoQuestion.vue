<template>

  <div w-full text-left flex flex-col gap-4>
    <Field v-model="model" :name="props.name" v-slot="{ meta, errors }">
      <label for="" >
        <slot name="icon"></slot>{{ $t(props.label) }}
      </label>
      <div w-full flex gap-4 flex-wrap>

        <div flex items-center justify-center gap-2  >
          <RadioButton inputId="yes" :value="positiveValue" v-bind="{ ...$attrs }" v-model="model"
            :invalid="meta.validated && !meta.valid" />
          <label :for="option" flex items-center justify-center gap-2>
            Sí
          </label>
        </div>
        <div flex items-center justify-center gap-2 >
          <RadioButton inputId="no" :value="negativeValue" v-bind="{ ...$attrs }" v-model="model"
            :invalid="meta.validated && !meta.valid" />
          <label :for="option" flex items-center justify-center gap-2>
            No
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
import { computed, ref } from 'vue';
import { Field } from 'vee-validate';
import RadioButton from 'primevue/radiobutton';
const props = defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  numbersAsValues: { type: Boolean, default:false },

});
const error = ref('error.error')
const model = defineModel();
const positiveValue = computed(()=>props.numbersAsValues?1:true)
const negativeValue = computed(()=>props.numbersAsValues?0:false)

</script>
