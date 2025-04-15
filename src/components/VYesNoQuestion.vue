<template>

  <div :class="$attrs.class" flex-1 min-w-20rem text-left flex flex-col gap-4>
    <Field v-model="model"  :name="props.name" v-slot="{ meta, errors }">
      <label for="" >
        <slot name="icon"></slot>{{ $t(props.label) }}
      </label>
      <div w-full flex gap-4 flex-wrap>

        <div flex items-center justify-center gap-2  >
          <RadioButton  inputId="yes" :value="true" v-bind="{ ...$attrs }" v-model="model"
            :invalid="canValidate && meta.validated && !meta.valid" />
          <label for="yes" flex items-center justify-center gap-2>
            {{ props.yesOption?props.yesOption:$t('global.yes') }} 
          </label>
        </div>
        <div flex items-center justify-center gap-2 >
          <RadioButton inputId="no" :value="false" v-bind="{ ...$attrs }" v-model="model"
            :invalid="canValidate && meta.validated && !meta.valid" />
          <label for="yes" flex items-center justify-center gap-2>
            {{ props.noOption?props.noOption:$t('global.no')  }} 
          </label>
        </div>
      </div>


      <Transition name="fast-fade">
        <small text-red v-if="canValidate && meta.validated && !meta.valid">{{ errors[0]?$t(errors[0]):'' }}</small>
      </Transition>
    </Field>
  </div>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate';
import RadioButton from 'primevue/radiobutton';
const props = defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  numbersAsValues: { type: Boolean, default:false },
  yesOption: { type: String},
  noOption: { type: String},
  default:{type:Boolean},
  canValidate:{type:Boolean, default:true}
});
const model = defineModel();
if(props.default!==undefined)
  model.value = props.default

// const positiveValue = computed(()=>props.numbersAsValues ?1:true)
// const negativeValue = computed(()=>props.numbersAsValues  ?0:false)

</script>
