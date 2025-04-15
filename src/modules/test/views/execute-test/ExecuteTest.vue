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
import AdminSideBar from "@/layouts/admin/components/AdminSideBar.vue";
import ExecuteTestSideBar from "./components/ExecuteTestSideBar.vue";
import Drawer from "primevue/drawer";
import ExecuteTestNavbar from "./components/ExecuteTestNavbar.vue";
const { t } = useI18n();

const VTestResult = defineAsyncComponent(() => import("../../../results/views/VTestResult.vue"));
const dialog = useDialog();
const toast = useToast();
const confirm = useConfirm();
const router = useRouter();
const executeTest = useExecuteTest()

const setInitialData = (d: { time_duration: number; series: { time_serie_duration: number; }[]; name: string | undefined; fk_id_type_test: string | number | undefined; }) => {
  executeTest.setData(d)



  test.name = d.name;
  test.type = d.fk_id_type_test;
  test.questions = executeTest.getTestExecutionInLocal()
  executeTest.saveTestExecutionInLocal(test?.questions)










}

const { data, isSuccess, isError, isPending, refetch } = useTest(
  router.currentRoute.value.params.id_test as string
  , setInitialData, () => [
    {
      name: "type_psi_test",
    },
    {
      name: "series",
      relations: [
        {
          name: "questions",
          relations: ["type", "answers", "top_value"],
        },
      ],
    },
  ]
);

const test = reactive(new TestExecution(router.currentRoute.value.params.id_test[0]));

provide("executeTest", executeTest);

provide<TestExecution>("test", test);

//DIALOGS
const dialogRef = ref(null)

provide("dialogRef", dialogRef);



const showResults = () => {
  if (dialogRef.value) {
    dialogRef.value.close();
  } else {
    dialogRef.value =
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
  }

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

const visible = ref(false)

const visibleTimer = ref(true)

</script>
<template>
  <ExecuteTestNavbar>
    <template #sidebar-button>
      <div xl:hidden block>
        <Button icon="pi pi-bars" h-fit severity="secondary" @click="visible = true" />

      </div>
    </template>
  </ExecuteTestNavbar>
  <main bg-white w-screen h-screen flex anim-fade-in-1>

    <LoadingPanel centered :loading="isPending" :error="isError" :refetch="refetch" />







    <div h-full flex flex-col overflow-auto max-w-full rounded-xl w-full>
      <VTestHeader v-if="isSuccess && router.currentRoute.value.params.id_test == data.id_test" :data="data"
        @next-serie="executeTest.nextSerie(test)">
        <template #timer>
          <div h-10 flex gap-2 items-center w-fit>
            <vue-countdown text-slate-600 text-xl :time="executeTest.timeCountdown.value" v-slot="{ minutes, seconds }"
              @end="executeTest.timeOver()">
              <div flex items-center gap-2 border-solid border-1 border-slate-200 rounded-xl p-1 min-w-12rem>
                <Button :label="visibleTimer ? t('execute-test.tooltips.hide') : t('execute-test.tooltips.show')"
                  @click="visibleTimer = !visibleTimer" icon="pi pi-clock" severity="secondary"></Button>
                <span font-bold v-if="visibleTimer">{{ `${minutes > 9 ? minutes : `0` + minutes}:${seconds > 9 ? seconds
                  : `0` + seconds}` }}</span>
              </div>

            </vue-countdown>

          </div>

        </template>
      </VTestHeader>


      <div class="test__container gradient-background" pt-4 px-4 flex flex-col items-center overflow-auto h-full>
        {{ test.questions }}

        <VTestSerie v-if="isSuccess && router.currentRoute.value.params.id_test == data.id_test"
          :serie="data.series[executeTest.serieIndex.value]" />


      </div>

    </div>





    <aside class="hidden xl:flex h-full">
      <ExecuteTestSideBar v-if="isSuccess && router.currentRoute.value.params.id_test == data.id_test" :data="data" />

    </aside>



    <aside class="card flex justify-center">
      <Drawer position="right" v-model:visible="visible" class="!w-fit">
        <template #container>
          <ExecuteTestSideBar v-if="isSuccess && router.currentRoute.value.params.id_test == data.id_test" :data="data"
            @close="visible = false" />

        </template>

      </Drawer>

    </aside>

  </main>


</template>
