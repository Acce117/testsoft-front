<script setup lang="ts">
import VTestCard from "./components/VTestCard.vue";
import { nextTick, ref, watch } from "vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { userStore } from "@/modules/security/store/user-store";
const user = userStore();
import { useAssignedTests } from "../../composables/useAssignedTests";
import Carousel from "primevue/carousel";
import Button from "primevue/button";
import Popover from "primevue/popover";


const { tests, isPending, isError } = useAssignedTests()

// watch(tests, (newValue) => {
//   user.assignedTests = [];
//   newValue.forEach((test: any) => {
//     let availableDate: Date = null;
//     if (test.applicatedTests[0]) {
//       availableDate = new Date(test.applicatedTests[0].date);
//       availableDate.setFullYear(
//         availableDate.getFullYear() + parseInt(test.recurringTime)
//       );
//     }
//     user.assignedTests.push({
//       id: test.id,
//       availabilityTime: availableDate,
//     });
//     sessionStorage.setItem("user", JSON.stringify(user.$state));
//   });
// });

// const renderPagination = () => {
//   if (result.value.length <= 3 && window.innerWidth >= 768)
//     pagination.enabled = false;
//   else pagination.enabled = true;
// };

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 2,
    numScroll: 1
  },

  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);

const op = ref();
const selectedTest = ref();

const displayProduct = (event, test) => {
  op.value.hide();

  selectedTest.value = test;
  console.log('asdsad')

  nextTick(() => {
    op.value.show(event);
  });

}

const hidePopover = () => {
  op.value.hide();
}

</script>
<template>
  <VError v-if="isError" />
  <section v-else-if="!isPending">
    <h2 text-slate-800 page-title>{{ $t('select-test.title') }}</h2>

    <Carousel :value="tests" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions" circular>
      <template #item="slotProps">
        <VTestCard :test="slotProps.data" :infoCb="displayProduct" />
      </template>
    </Carousel>
    <!-- <Swiper :spaceBetween="30" :slidesPerView="1" :loop="true" :pagination="pagination" :navigation="true"
      :modules="modules" :breakpoints="{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }"
      @breakpoint="renderPagination()">
      <swiper-slide class="swiper-slide" v-for="test in tests" :key="test.id_test">
        <VTestCard :id="parseInt(test.id_test)" :title="test.name" :description="test.description"
          :duration="parseInt(test.durationTime)" :recurringTime="parseInt(test.recurringTime)"
          :applicatedTests="test.applicatedTests" />
      </swiper-slide>
    </Swiper> -->
    <Popover ref="op">
      <div v-if="selectedTest" class="rounded flex flex-col  w-24rem lg:w-40rem">

        <div class="pt-4">
          <div class="flex flex-col justify-between text-sm text-justify items-start gap-2 mb-4">
            <div>
              <span font-bold>Nombre: </span>
              <span class="font-medium text-surface-500  ">{{ selectedTest.name
                }}</span>
            </div>
            <div>
              <span font-bold>Disponibilidad: </span>
              <span class="font-medium text-secondary ">Disponible</span>
            </div>
            <div>
              <span font-bold>Descripción: </span>
              <span class="font-medium text-surface-500  ">{{ selectedTest.description
                }}</span>
            </div>

          </div>
            <Button label="Aceptar" outlined @click="hidePopover"></Button>
        </div>
      </div>
    </Popover>
  </section>
  <VLoading v-else />
</template>
<style scoped>
.test-img {
  background: -webkit-linear-gradient(0deg, #3faee4, black)
}
</style>
