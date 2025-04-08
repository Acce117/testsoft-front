<script setup lang="ts">
import VTestCard from "./components/VTestCard.vue";
import { ref } from "vue";

import { userStore } from "@/modules/security/store/user-store";
const user = userStore();
import { useAssignedTests } from "../../composables/useAssignedTests";
import Carousel from "primevue/carousel";
import Button from "primevue/button";
import LoadingPanel from "@/components/LoadingPanel.vue";
import Dialog from "primevue/dialog";
import { Test } from "@/modules/management/test/models/test.model";
import router from "@/router";
import Paginator from "@/components/Paginator.vue";


const { tests, isSuccess, isPending, isError, refetch } = useAssignedTests((value) => {
  user.assignedTests = [];
  value.forEach((test: any) => {
    let availableDate: Date = null;
    if (test.test_apps.length > 0) {
      availableDate = new Date(test.test_apps[test.test_apps.length - 1].date);
      availableDate.setFullYear(
        availableDate.getFullYear() + parseInt(test.recurring_time)
      );
    }
    user.assignedTests.push({
      id: test.id_test,
      availabilityTime: availableDate,
    });
    sessionStorage.setItem("user", JSON.stringify(user.$state));
  });
})


const queryFunction = async () => {
  const test = await new Test().getAssignedTests(userStore().user_id)
  user.assignedTests = [];
  test.forEach((test: any) => {
    let availableDate: Date = null;
    if (test.test_apps.length > 0) {
      availableDate = new Date(test.test_apps[test.test_apps.length - 1].date);
      availableDate.setFullYear(
        availableDate.getFullYear() + parseInt(test.recurring_time)
      );
    }
    user.assignedTests.push({
      id: test.id_test,
      availabilityTime: availableDate,
    });
    sessionStorage.setItem("user", JSON.stringify(user.$state));
  });

  return test
}

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


const dialogVisible = ref(false)
const showDialog = (test: Test) => {
  selectedTest.value = test
  dialogVisible.value = true
}

const selectedTest = ref();

const executeTest = () => {
  router.push(`/execute-test/${selectedTest.value.id_test}`);
};

</script>
<template>
  <section v-if="isSuccess">
    <h2 text-slate-800 page-title>{{ $t('select-test.title') }}</h2>

    <Carousel v-if="tests.length > 0" h-90 :value="tests" :numVisible="3" :numScroll="1" :responsiveOptions circular>
      <template #item="slotProps">

      </template>
    </Carousel>
    <Paginator :query-function="(params) => queryFunction()" :query-key="'users-current-group'">
      <template #item-template="{ data }">
        <VTestCard :test="data" @show-dialog="(value) => showDialog(value)" />
      </template>
    </Paginator>


    <Dialog v-if="selectedTest" v-model:visible="dialogVisible" modal :header="selectedTest.name"
      class="w-4/5 max-w-50rem min-w-25rem">


      <div class="pt-4">
        <div class="flex flex-col justify-between text-base text-justify items-start gap-2 mb-4">

          <span class="font-medium text-surface-500  ">{{ selectedTest.description
          }}</span>

        </div>
        <div class="dialog-footer">
          <Button type="button" id="cancel-button" :label="$t('global.cancel')" severity="secondary"
            @click="dialogVisible = false"></Button>
          <Button type="button" id="start-button" :label="$t('global.start')" @click="executeTest"></Button>
        </div>
      </div>
    </Dialog>

  </section>
</template>
<style>
.test-img {
  background: -webkit-linear-gradient(0deg, #3faee4, black)
}

.p-carousel-viewport {
  min-height: 18rem !important;
}
</style>
