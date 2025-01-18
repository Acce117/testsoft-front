<template>

  <div w-full>
    <Field v-model="model" :name="props.name" v-slot="{ meta, errors }">
      <InputGroup>
        
        <FloatLabel variant="on">
          <InputNumber v-if="props.number" v-model="model" showButtons v-bind="{ ...$attrs }" fluid
            :invalid="meta.validated && !meta.valid" />
          <Textarea v-else-if="props.textarea" v-bind="{ ...$attrs }" fluid v-model="model"
            :invalid="meta.validated && !meta.valid" />
          <InputMask v-else-if="$attrs.mask" toggle-mask :mask="$attrs.mask" fluid v-bind="{ ...$attrs }"
            v-model="model" :invalid="meta.validated && !meta.valid" />
          <Password v-else-if="props.password" toggle-mask :feedback="false" fluid v-bind="{ ...$attrs }"
            v-model="model" :invalid="meta.validated && !meta.valid" />
          <InputText  v-else v-bind="{ ...$attrs }" fluid v-model="model" :invalid="meta.validated && !meta.valid" />
          <label for="" flex items-center justify-center gap-2>
            <slot name="icon"></slot>{{ $t(props.label) }}
          </label>
        </FloatLabel>
        <InputGroupAddon v-if="props.tooltip">
          <i cursor-pointer class="pi pi-info-circle"></i>
        </InputGroupAddon>
      </InputGroup>

      <Transition name="fast-fade">
        <small text-red v-if="meta.validated && !meta.valid">{{ errors[0] ? $t(errors[0]) : '' }}</small>
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
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
const props = defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  textarea: Boolean,
  number: Boolean,
  password: Boolean,
  tooltip:String

});
const error = ref('error.error')
const model = defineModel();

</script>
