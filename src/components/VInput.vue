<template>
  <div class="custom-input">
    <input
      :id="props.id"
      :type="props.type"
      required
      v-model="model"
      bg-white
      rd-1rem
      w-25rem
      mb-2rem
      @input="canValidate=true"
      :class="{ 'invalid-input': canValidate?!validate():false }"
    />
    <label :for="props.id"><slot></slot>{{ $t(props.text) }}</label>
    <span font-size-1.5rem absolute text-red top-3rem right-0 md:top-4rem>{{ $t(error) }}</span>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {validateEmptyString} from '@/common/utils/validations.ts'
const props = defineProps({
  id: String,
  type: String,
  text: { type: String, required: true },
  validation: {
    type: Function,
    default: function (text: String) {
      validateEmptyString(text)
    }
  },
});
const error = ref('Error')
let canValidate = ref(false)
const emit = defineEmits(["invalid"]);
const model = defineModel();
const validate = () => {
  let isValid = true;
  try{
    props.validation(model.value)
  }catch (e:any){
    emit("invalid");
    isValid = false;
    error.value = e.message
  }
  return isValid;
};
</script>
<style>
.custom-input {
  position: relative;
}
.custom-input input {
  box-shadow: var(--shadow);
}
.custom-input input.invalid-input {
  transition: all ease 0.5s;
  box-shadow: 0 0 0.3rem 0.3rem rgba(255, 0, 0, 0.7);
}
.custom-input input.invalid-input~span {
  display: block;
}
.custom-input span{
    display: none;
}
.custom-input label {
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
  animation: 1s fade-in;
}

.custom-input label img {
  transition: all ease 0.2s;
  width: 2rem;
}

.custom-input input:valid ~ label,
.custom-input input:focus ~ label {
  color: white;
  top: -2.8rem;
  font-size: 1rem;
}

.custom-input input:valid ~ label img,
.custom-input input:focus ~ label img {
  filter: invert();
  transform: scale(0.8);
}
@media (min-width: 768px) {
  .custom-input label,
  .custom-input {
    font-size: 2rem;
  }
  .custom-input input {
    height: 4rem;
  }
  .custom-input input:valid ~ label,
  .custom-input input:focus ~ label {
    font-size: 1.5rem;
    color: black;
  }

  .custom-input input:valid ~ label img,
  .custom-input input:focus ~ label img {
    filter: none;
  }
}
</style>
