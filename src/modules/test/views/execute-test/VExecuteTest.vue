<script setup lang="ts">
import VTestSerie from "./VTestSerie.vue";
import VTestHeader from "./VTestHeader.vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import {
  provide,
  markRaw,
  reactive,
  ref,
  defineAsyncComponent,
  onUnmounted,
} from "vue";
import { TestAplication } from "../../classes/testAplication";
import VButtonsContainer from "@/components/buttons/VButtonsContainer.vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useDialog } from "primevue/usedialog";
import { useI18n } from "vue-i18n";
import { useTestToExecute } from "../../composables/useTestToExecute";
import AdminNavbar from "@/layouts/admin/components/AdminNavbar.vue";
import { useExecuteTest } from "../../useExecuteTest";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import useEvents from "@/common/utils/useEvents";
const { t } = useI18n();
const VDialogFooter = defineAsyncComponent(
  () => import("@/components/dialog/VDialogFooter.vue")
);
const VDialogMessage = defineAsyncComponent(
  () => import("@/components/dialog/VDialogMessage.vue")
);
const VTestResult = defineAsyncComponent(() => import("./VTestResult.vue"));
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

const { data, isSuccess, isError, isPending } = useTestToExecute(
  router.currentRoute.value.params.id_test as string
  , setInitialData);

const test = reactive(new TestAplication(router.currentRoute.value.params.id_test[0]));

provide("executeTest", executeTest);

provide<TestAplication>("test", test);

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

const timeOverDialog = () => {
  dialog.open(VDialogMessage, {
    props: {
      header: t("results.test"),
      modal: true,
    },
    templates: {
      footer: markRaw(VDialogFooter),
    },
  });
};
useEvents().addListener("dialog-timeover", () => {
  timeOverDialog()
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
  <main bg-sky-200 w-screen h-screen flex-col gap-2 p-2 flex anim-fade-in-1>
    <AdminNavbar>

    </AdminNavbar>
    <VTestHeader v-if="isSuccess" :data="data" @next-serie="executeTest.nextSerie(test)">
      <template #timer>
        <div h-10 flex gap-2 items-center justify-between w-7rem>
          <vue-countdown  text-slate-600 :class="visibleTimer ? 'opacity-0' : 'opacity-100'" text-xl
            :time="executeTest.timeCountdown.value" v-slot="{ minutes, seconds }" @end="executeTest.timeOver()">
            {{ minutes > 9 ? minutes : `0` + minutes }}:{{
              seconds > 9 ? seconds : `0` + seconds
            }}
          </vue-countdown>
          <Button w-3rem @click="visibleTimer = !visibleTimer" icon="pi pi-clock" severity="secondary"></Button>
        </div>

      </template>
    </VTestHeader>


    <VLoading v-if="isPending" />

    <VError v-if="isError" />

    <div v-if="isSuccess" class="test__container" h-full overflow-auto max-w-full px-4 lg:px-16 py-2 rounded-xl w-full>

      <VButtonsContainer>
        <Button fluid @click="executeTest.validateTest(test)" icon="pi pi-file-check"
          v-tooltip.right="t('execute-test.tooltips.save')" />

        <Button @click="executeTest.exitTestConfirm('select-test')" v-tooltip.right="t('execute-test.tooltips.exit')"
          icon="pi pi-times" />
      </VButtonsContainer>


      <VTestSerie :serie="data.series[executeTest.serieIndex.value]" />

    </div>
    <Dialog v-model:visible="executeTest.infoVisible.value" modal :header="t('global.info')" style="width: 50%">
      <span class="modal__long-message">
        <span font-bold>{{ $t("execute-test.dialogs.description.title") }}:</span>
        {{ data.description }} <br />{{
          $t("execute-test.dialogs.description.message")
        }} </span>
    </Dialog>

  </main>


</template>

