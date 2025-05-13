<template>
  <div class="custom-input-table" w-full h-full>
    <input
      :id="props.id"
      :type="props.type"
      required
      v-model="model"
      :maxlength="props.max"
      :minlength="props.min"
      @input="emit('focus-input', props.id)"
      :class="{ 'invalid-input': canValidate ? !validate() : false }"
      w-full
      h-full
    />
    <span font-size-1.2rem absolute text-red top--8rem pa-.5rem shadow-box>{{
      $t(error)
    }}</span>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { validateEmptyString } from "@/common/utils/validations.ts";
const props = defineProps({
  id: {
    type:String,
    required:true
  },
  type: String,
  max: Number,
  min: Number,
  validation: {
    type: Function,
    default: function (text: String) {
      validateEmptyString(text);
    },
  },
});
const error = ref("error.error");
let canValidate = ref(false);
const emit = defineEmits(["invalid", "valid", 'focus-input']);
const model = defineModel();
const validate = () => {
  let isValid = true;
  try {
    props.validation(model.value);
    emit("valid");
  } catch (e: any) {
    emit("invalid");
    isValid = false;
    error.value = e.message;
  }
  return isValid;
};

</script>
<style>
.custom-input-table {
  position: relative;
}
.custom-input-table input {
  border: solid black 0.2rem;
  animation: border-input 2s infinite;
  transition: all ease 0.5s;
}
.custom-input-table input.invalid-input {
  border: solid rgb(255, 144, 144) 0.3rem;
  animation: border-input-invalid 2s infinite;
  box-shadow: none;
}
.custom-input-table:hover input.invalid-input ~ span,
input.invalid-input:active ~ span {
  display: block;
}
.custom-input-table span {
  display: none;
}
tr:has(input:focus) input {
  animation: none;
}
tr:has(input:focus) input:not(:focus) {
  border-color: transparent;
}

.custom-input-table input:focus {
  animation: none;
}

@media (min-width: 1024px) {
  .custom-input-table input {
    font-size: 1.8rem;
  }
}
</style>
