<template>
  <div class="custom-input-table" w-full h-full>
    <input
      :id="props.id"
      :type="props.type"
      required
      v-model="model"
      :maxlength="props.max"
      :minlength="props.min"
      bg-white
      @input="canValidate = true"
      :class="{ 'invalid-input': canValidate ? !validate() : false }"
      w-full h-full
      />
    <span
      font-size-1.5rem
      absolute
      text-red
      top-3rem
      right-0
      md:top-4rem
      b-dark
      >{{ $t(error) }}</span
    >
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { validateEmptyString } from "@/common/utils/validations.ts";
const props = defineProps({
  id: String,
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
const error = ref("Error");
let canValidate = ref(false);
const emit = defineEmits(["invalid", "valid"]);
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
  transition: all ease .5s;
}
.custom-input-table input.invalid-input {
  border: solid red 0.3rem;
  animation: border-input-invalid 2s infinite;
  box-shadow: none;
}
.custom-input-table input.invalid-input ~ span {
  display: block;
}
.custom-input-table span {
  display: none;
}
.custom-input-table label {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  position: absolute;
  top: 0.2rem;
  left: 1rem;
  transition: all ease 0.2s;
  color: black;
  user-select: none;
  pointer-events: none;
  animation: 2s fade-in;
}

.custom-input-table label img {
  transition: all ease 0.2s;
  width: 2rem;
}


.custom-input-table input:focus  {
  animation:none;
}
@keyframes border-input {
  0% {
    border-color: black;
  }
  50% {
    border-color: transparent;
  }
  100% {
    border-color: black;
  }
}
@keyframes border-input-invalid {
  0% {
    border-color: red;
  }
  50% {
    border-color: transparent;
  }
  100% {
    border-color: red;
  }
}
@media (min-width:1024px) {
  .custom-input-table input {
    font-size: 1.8rem;
  }
 
  
}
</style>
