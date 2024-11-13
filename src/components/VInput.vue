<template>

  <div w-full> 
    <Field v-model="model" :name="props.name" v-slot="{  meta, errors }">
      <FloatLabel variant="on">
        <InputMask v-if="$attrs.mask" toggle-mask :mask="$attrs.mask" fluid v-bind="{ ...$attrs }"  v-model="model" :invalid="meta.validated && !meta.valid" />
        <Password v-else-if="props.password" toggle-mask :feedback="false" fluid v-bind="{ ...$attrs }"  v-model="model" :invalid="meta.validated && !meta.valid" />
        <InputText v-else v-bind="{ ...$attrs }" fluid v-model="model" :invalid="meta.validated && !meta.valid" />
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
import Password from 'primevue/password';
import InputMask from 'primevue/inputmask';
const props = defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  password:Boolean

});
const error = ref('error.error')
const model = defineModel();

</script>
