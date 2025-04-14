<template>
    <Field v-model="src" :name="props.name" v-slot="{ meta, errors }">




        <div class=" flex flex-col justify-start items-left  gap-2">
            <label for="" flex items-center gap-2>
                <slot name="icon"></slot>{{ $t(props.label) }}
            </label>
            <FileUpload w-fit :invalid="meta.validated && !meta.valid" mode="basic" :chooseLabel="$t('choose')"
                accept="image/*" maxFileSize="2524288" @select="onFileSelect" customUpload auto severity="secondary"
                 />
            <FileUpload w-fit :invalid="meta.validated && !meta.valid"
                accept="image/*" :maxFileSize="2524288" file-limit="1" @select="onFileSelect" :multiple="false">
                <template #header="{ chooseCallback, clearCallback, files }">
                    <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                        <div class="flex gap-2">
                            <Button @click="chooseCallback()" :disabled="files.length>0" icon="pi pi-images" rounded outlined
                                severity="secondary"></Button>
                            
                            <Button @click="clearCallback()" icon="pi pi-times" rounded outlined severity="danger"
                                :disabled="!files || files.length === 0"></Button>
                        </div>
                        <ProgressBar :value="totalSizePercent" :showValue="false"
                            class="md:w-20rem h-1 w-full md:ml-auto">
                            <span class="whitespace-nowrap">{{ totalSize }}B / 1Mb</span>
                        </ProgressBar>
                    </div>
                </template>
                <template #content="{ files}">
                    <div class="flex flex-col gap-8 pt-4">
                        <div v-if="files.length > 0">
                            <div class="flex flex-wrap gap-4">
                                <div v-for="(file, index) of files" :key="file.name + file.type + file.size"
                                    class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                                    <div>
                                        <img role="presentation" :alt="file.name" :src="file.objectURL" width="100"
                                            height="50" />
                                    </div>
                                    <span
                                        class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{
                                        file.name }}</span>
                                    <div>{{ formatSize(file.size) }}</div>
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                </template>
                <template #empty>
                    <div class="flex items-center justify-center flex-col">
                        <i class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color" />
                        <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
                    </div>
                </template>
            </FileUpload>
            <img v-if="src" :src="src" alt="Image" class="shadow-md rounded-xl w-full sm:w-64" />
            <Transition name="fast-fade">
                <small text-red v-if="meta.validated && !meta.valid">{{ errors[0] ? $t(errors[0]) : '' }}</small>
            </Transition>
        </div>


    </Field>


</template>

<script setup>
import { Button, ProgressBar } from "primevue";
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
    files.value = event.files;
    files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
    });
    const file = event.files[0];
    const reader = new FileReader();

    model.value = file
    reader.onload = async (e) => {
        src.value = e.target.result;

    };
    

    reader.readAsDataURL(file);
}
import { usePrimeVue } from 'primevue/config';

const $primevue = usePrimeVue();

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
    clear();
    totalSize.value = 0;
    totalSizePercent.value = 0;
};

const onSelectedFiles = (event) => {
    files.value = event.files;
    files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
    });
};




const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale.fileSizeTypes;

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};
</script>
