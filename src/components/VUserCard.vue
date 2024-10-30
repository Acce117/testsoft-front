<template>
<div relative flex flex-col bg-white shadow-xl rounded-xl w-21rem text-black pa-1rem gap-1rem anim-scale-0.5>
        <img
          rd-4rem
          border-solid
          bg-white
          border-white
          border-.4rem
          absolute
          top--2rem
          h-4rem
          
          :src="props.img?props.img: props.sex==='F'?'/img/user_female.png':'/img/user_1.png'"
        />
        <span font-bold text-md mt-1rem
          >{{ props.name }}</span
        >
        
        <div v-if="props.username" text-xs flex gap-1rem>
            <img w-1rem src="/img/user.svg">
            {{ props.username }}
        </div>
        <div v-if="props.role" text-xs flex gap-1rem>
            <img w-1rem src="/img/certified.svg">
            {{ props.role }}
        </div>
        <div v-if="props.id" text-xs flex gap-1rem>
            <img w-1rem src="/img/id.svg">
            {{ props.id }}
        </div>
        <div v-if="props.phone" text-xs flex gap-1rem>
            <img w-1rem src="/img/phone.svg">
            {{ props.phone }}
        </div>
        <div v-if="props.mail" text-xs flex gap-1rem>
            <img w-1rem src="/img/mail.svg">
            {{ props.mail }}
        </div>
        <div v-if="props.group && props.group !=='null'" text-xs flex gap-1rem>
            <img w-1rem src="/img/group.svg">
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