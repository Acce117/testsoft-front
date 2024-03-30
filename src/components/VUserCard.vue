<template>
<div relative flex flex-col shadow-box min-w-36rem text-black pa-2rem gap-1rem anim-scale-0.5>
        <img
          rd-4rem
          border-solid
          bg-white
          border-white
          border-.4rem
          absolute
          top--3.5rem
          h-7rem
          
          :src="props.img?props.img: props.sex==='F'?'/img/user_female.png':'/img/user_1.png'"
        />
        <span font-bold font-size-1.7rem mt-2rem
          >{{ props.name }}</span
        >
        
        <div v-if="props.username" font-size-1.5rem flex gap-1rem>
            <img w-2rem src="/img/user.svg">
            {{ props.username }}
        </div>
        <div v-if="props.role" font-size-1.5rem flex gap-1rem>
            <img w-2rem src="/img/certified.svg">
            {{ props.role }}
        </div>
        <div v-if="props.id" font-size-1.5rem flex gap-1rem>
            <img w-2rem src="/img/id.svg">
            {{ props.id }}
        </div>
        <div v-if="props.phone" font-size-1.5rem flex gap-1rem>
            <img w-2rem src="/img/phone.svg">
            {{ props.phone }}
        </div>
        <div v-if="props.mail" font-size-1.5rem flex gap-1rem>
            <img w-2rem src="/img/mail.svg">
            {{ props.mail }}
        </div>
        <div v-if="props.group" font-size-1.5rem flex gap-1rem>
            <img w-2rem src="/img/group.svg">
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