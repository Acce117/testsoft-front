<template>
<div relative flex flex-col border-1 text-slate-800 border-slate-200 border-solid bg-white shadow-xl rounded-xl w-21rem  pa-1rem gap-1rem anim-scale-0.5>
        <img
          rd-4rem
          
          size-4rem
          
          :src="props.img"
          v-if="props.img"
        />
        <div v-else rounded-full size-15 flex justify-center border-4 border-solid border-slate-800  overflow-hidden>
            <i class="pi pi-user"  style="font-size: 3rem"></i>
        </div>

        <span font-bold text-md 
          >{{ props.name }}</span
        >
        
        <div v-if="props.username" text-xs flex gap-1rem>
            <i class="pi pi-user" style="font-size: 1rem"></i>
            {{ props.username }}
        </div>
        <div v-if="props.role" text-xs flex gap-1rem>
            <i class="pi pi-cog" style="font-size: 1rem"></i>
            {{ props.role }}
        </div>
        <div v-if="props.phone" text-xs flex gap-1rem>
            <i class="pi pi-phone" style="font-size: 1rem"></i>
            {{ props.phone }}
        </div>
        <div v-if="props.mail" text-xs flex gap-1rem>
            <i class="pi pi-envelope" style="font-size: 1rem"></i>
            {{ props.mail }}
        </div>
        <div v-if="props.group && props.group !=='null'" text-xs flex gap-1rem>
            <i class="pi pi-users" style="font-size: 1rem"></i>
            {{ props.group }}
        </div>
      </div>

</template>
<script setup>
const props = defineProps({
    id:String,
    username:String,
    name:String,
    role:String,
    phone:String,
    mail:String,
    sex:String,
    group:String,
    img:String
})
</script>