<template>
    <Field v-model="src" :name="props.name" v-slot="{ meta, errors }">




        <div class=" flex flex-col justify-start items-left  gap-2">
            <label for="" flex items-center gap-2>
                <slot name="icon"></slot>{{ $t(props.label) }}
            </label>
            <FileUpload w-fit  :invalid="meta.validated && !meta.valid" mode="basic" :chooseLabel="$t('choose')"
                accept="image/*" maxFileSize="2524288" @select="onFileSelect" customUpload auto severity="secondary"
                class="p-button-outlined" />
            <img v-if="src" :src="src" alt="Image" class="shadow-md rounded-xl w-full sm:w-64" />
            <Transition name="fast-fade">
                <small text-red v-if="meta.validated && !meta.valid">{{ errors[0] ? $t(errors[0]) : '' }}</small>
            </Transition>
        </div>


    </Field>


</template>

<script setup>
import FileUpload from "primevue/fileupload";
import FloatLabel from "primevue/floatlabel";
import { Field } from "vee-validate";
import { ref } from "vue";

const props = defineProps({
    label: { type: String, required: true },
    name: { type: String, required: true },
})
const src = ref(null);

const model = defineModel()

function onFileSelect(event) {
    const file = event.files[0];
    const reader = new FileReader();

    model.value = file
    reader.onload = async (e) => {
        src.value = e.target.result;
        
    };

    reader.readAsDataURL(file);
}
</script>
