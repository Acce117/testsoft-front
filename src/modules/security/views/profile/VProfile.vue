<script setup lang="ts">
import { useRouter } from "vue-router";
import { userStore } from "../../store/user-store";
import { ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const confirm = useConfirm();
const router = useRouter();
const logOut = () => {
  visible.value = false;
  user.$reset();
  sessionStorage.removeItem('user');
  router.push("/login");
};

const user = userStore();
const visible = ref(false);

const logOutConfirm = ()=>{
  confirm.require({
    message: t('profile.dialogs.close-session.message'),
    header: t('profile.dialogs.close-session.header'),
    rejectLabel: t('global.cancel'),
    acceptLabel: t('global.confirm'),
    accept: () => {
      logOut();
    },
  })
}

</script>
<template>
  <h2 class="page-title">{{$t('profile.title') }}</h2>
  <div class="profile">
    <span>{{$t('profile.name') }}: {{ user.username }}</span>
    <span>{{$t('profile.id') }}:{{ user.ci }}</span>
    <span v-if="user.group">{{$t('profile.group') }}: {{ user.group }}</span>
    <span>{{$t('profile.role') }}: {{ user.role }}</span>
    <span v-if="user.userType">{{$t('profile.usertype') }}: {{ user.userType }}</span>
    <button black-button w-15rem font-size-2rem class="p-ripple" v-ripple @click="logOutConfirm()">
      {{$t('profile.close-session') }}
    </button>
  </div>
</template>
<style>
.profile {
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 2rem 3rem;
  gap: 2rem;
  font-size: 2rem;
  text-wrap: wrap;
  animation: fade-in 1s;
  color: white;
}

</style>
