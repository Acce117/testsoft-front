<template>
  <section
    flex-col
    anim-scale-0.5
    text-white
    centered
    gap-2rem
    mt-4rem
  >
    <h2 text-slate-8 font-bold text-3xl>{{ $t("info.developers") }}</h2>
    <div
      flex-col
      anim-scale-0.5
      text-white
      centered
      gap-5rem
      lg:flex-row
      lg:mt-2rem
      lg:gap-2rem
    >
      <VUserCard
        mr-2rem
        lg:mr-0
        lg:mb-10rem
        lg:order-1
        name="Tony García Álvarez"
        :role="t('info.roles.project_manager')"
        phone="+53 52972641"
        mail="tgarcia@gmail.com"
        img ="/img/tony.jpg"
      />
      <VUserCard
        ml-2rem
        lg:ml-0
        lg:order-2
        :role="t('info.roles.developer')"
        name="Jesús Manuel Castellanos Reynaldo"
        phone="+53 54634890"
        mail="jesuscastellanosreynaldo@gmail.com"
      />

      <VUserCard
        mr-2rem
        mb-2rem
        lg:order-0
        lg:mr-0
        lg:mb-0
        :role="t('info.roles.developer')"
        name="Ernesto Alejandro Carralero Conde"
        phone="+53 54360877"
        mail="ernestoalejandrocarraleroconde@gmail.com"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import VUserCard from "@/components/VUserCard.vue";
import { useI18n } from "vue-i18n";
const {t} = useI18n()
</script>
