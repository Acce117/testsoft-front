<template>
    <h4 font-bold mb-0>Condiciones a cumplir:</h4>
    <div v-for="condition in conditions" :key="condition.text">

        <div v-if="condition.satisfied()" flex items-center gap-2>
            <div bg-green-6 size-3 rounded-full></div>
            <span color-green-6>
                {{ condition.text }}
            </span>
        </div>
        <div v-else flex items-center gap-2>
            <div border-2 border-solid size-3 rounded-full></div>
            <span>
                {{ condition.text }}
            </span>
        </div>
    </div>

</template>
<script setup lang="ts">
const props = defineProps({
    conditions: {type:Array, required:true}
})

const verify=()=>{
    for (let i = 0; i <  props.conditions.length; i++) {
                if (!props.conditions[i].satisfied())
                    return false
            }
            return true
}
defineExpose({verify})
</script>