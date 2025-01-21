<template>
    <div v-if="props.loading" bg-white z-2 opacity-80 w-full h-full absolute top-0 left-0 rounded-xl flex
        justify-center>
        <span mt-2rem h-fit font-bold text-xl flex items-center justify-center gap-2 text-secondary>{{$t('global.loading')}} <i
                class="pi pi-spin pi-spinner" style="font-size: 1.5rem"></i> </span>

    </div>
    <div v-else-if="props.error" bg-white z-2 opacity-80 w-full h-full absolute top-0 left-0 rounded-xl flex
        justify-center>
        <span  mt-2rem h-fit font-bold text-xl flex flex-col items-center justify-center gap-2
            text-secondary>{{$t('global.error')}} <Button fluid v-if="props.refetch" @click="refetch"
                :label="$t('global.retry')" icon="pi pi-refresh"></Button></span>
    </div>

</template>
<script setup lang="ts">
import Button from 'primevue/button';

const props = defineProps({
    loading: Boolean,
    error: Boolean,
    refetch: Function
})
</script>