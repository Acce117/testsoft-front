<script setup lang="ts">
import VTestSerie from "./components/VTestSerie.vue";
import VTestHeader from "./components/VTestHeader.vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import {
  provide,
  reactive,
  ref,
  defineAsyncComponent,
  onUnmounted,
} from "vue";
import { TestExecution } from "../../classes/testExecution";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useDialog } from "primevue/usedialog";
import { useI18n } from "vue-i18n";
import AdminNavbar from "@/layouts/admin/components/AdminNavbar.vue";
import { useExecuteTest } from "./composables/useExecuteTest";
import Button from "primevue/button";
import useEvents from "@/common/utils/useEvents";
import { useTest } from "@/modules/management/test/composables/useTest";
import LoadingPanel from "@/components/LoadingPanel.vue";
const { t } = useI18n();

const VTestResult = defineAsyncComponent(() => import("../../../results/views/VTestResult.vue"));
const dialog = useDialog();
const toast = useToast();
const confirm = useConfirm();
const router = useRouter();
const executeTest = useExecuteTest()

const setInitialData = (d: { time_duration: number; series: { time_serie_duration: number; }[]; name: string | undefined; fk_id_type_test: string | number | undefined; }) => {
  executeTest.setData(d)
  let time: number;
  time = d.time_duration > 0 ? d.time_duration : d.series[0].time_serie_duration;
  executeTest.timeCountdown.value = time * 60001;
  test.name = d.name;
  test.type = d.fk_id_type_test;
}

const { data, isSuccess, isError, isPending, refetch } = useTest(
  router.currentRoute.value.params.id_test as string
  , setInitialData);

const test = reactive(new TestExecution(router.currentRoute.value.params.id_test[0]));

provide("executeTest", executeTest);

provide<TestExecution>("test", test);

//DIALOGS

provide("dialogRef", dialog);



const showResults = () => {
  dialog.open(VTestResult, {
    props: {
      header: t("results.title"),
      modal: true,
    },
    templates: {},
    data: {
      test,
    },
  });
};
useEvents().addListener("dialog-results", () => {
  showResults()
});



onBeforeRouteLeave((to) => {
  if (!isError.value) {
    if (!executeTest.confirmExit.value && to.name) {
      executeTest.exitTestConfirm(to.name.toString());
      return false;
    }
  }
  confirm.close();
});



onUnmounted(() => {
  toast.removeAllGroups();
});



const visibleTimer = ref(false)

</script>
<template>
  <main  bg-sky-200 w-screen h-screen flex-col gap-2 p-2 flex anim-fade-in-1>
    <AdminNavbar>

    </AdminNavbar>
    <LoadingPanel centered :loading="isPending" :error="isError" :refetch="refetch"/>

    <VTestHeader v-if="isSuccess && router.currentRoute.value.params.id_test ==data.id_test" :data="data" @next-serie="executeTest.nextSerie(test)">
      <template #timer>
        <div h-10 flex gap-2 items-center justify-between >
          <vue-countdown  text-slate-600 w-5rem :class="visibleTimer ? 'opacity-0' : 'opacity-100'" text-xl
            :time="executeTest.timeCountdown.value" v-slot="{ minutes, seconds }" @end="executeTest.timeOver()">
            {{ minutes > 9 ? minutes : `0` + minutes }}:{{
              seconds > 9 ? seconds : `0` + seconds
            }}
          </vue-countdown>
          <Button :label="visibleTimer ? 'Mostrar' : 'Ocultar'"  @click="visibleTimer = !visibleTimer" icon="pi pi-clock" severity="secondary"></Button>
        </div>

      </template>
    </VTestHeader>


    <div  class="test__container" h-full overflow-auto max-w-full px-4 lg:px-16 py-2 rounded-xl w-full>

      

      <VTestSerie v-if="isSuccess && router.currentRoute.value.params.id_test ==data.id_test" :serie="data.series[executeTest.serieIndex.value]" />

    </div>
    

  </main>


</template>

