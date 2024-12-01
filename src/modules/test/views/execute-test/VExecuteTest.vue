<script setup lang="ts">
import VTestSerie from "./VTestSerie.vue";
import VTestHeader from "./VTestHeader.vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import {
  provide,
  markRaw,
  reactive,
  ref,
  watch,
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

const { data, isSuccess, isError } = useTestToExecute(
  router.currentRoute.value.params.id_test as string
);
const test = reactive(new TestAplication(router.currentRoute.value.params.id_test[0]));

const serieIndex = executeTest.serieIndex

provide("executeTest", executeTest);


provide<TestAplication>("test", test);


//TIMER

let timeCountdown = ref();

watch(data, (newValue) => {
  if (newValue) {
    executeTest.setData(data)
    let time: number;
    if (newValue.time_duration > 0) time = newValue.time_duration;
    else time = newValue.series[0].time_serie_duration;
    timeCountdown.value = time * 60001;
    test.name = newValue.name;
    test.type = newValue.fk_id_type_test;
  }
});
const setNewTime = (time: number) => {
  timeCountdown.value = time + 1;
  setTimeout(() => {
    timeCountdown.value = time;
  }, 0);
};
let hasSecondOpportunity = true;
const timeOver = () => {
  try {
    if (data.value.time_duration > 0) {
      if (hasSecondOpportunity) {
        setNewTime(300000);
        hasSecondOpportunity = false;
        toast.add({
          severity: "warn",
          summary: t("global.warning") + ":",
          detail: t("execute-test.dialogs.test-ended-first-time"),
          life: 5000,
        });
      } else throw new Error("Time Over");
    } else {
      if (serieIndex.value < data.value.series.length - 1) {
        serieIndex.value += 1;
        setNewTime(
          data.value.series[serieIndex.value].time_serie_duration * 60000
        );
        toast.removeAllGroups();
        toast.add({
          severity: "warn",
          summary: t("global.warning") + ":",
          detail: t("execute-test.dialogs.serie-ended"),
          life: 5000,
        });
      } else throw new Error("Time Over");
    }
  } catch (e: any) {
    if (e.message === "Time Over") {
      executeTest.confirmExit.value = true;
      router.push("/select-test");
      timeOverDialog();
    } else console.error(e);
  }
};


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
  <section bg-sky-200 w-screen h-screen flex-col gap-2 p-2 flex anim-fade-in-1>
    <AdminNavbar>

    </AdminNavbar>
    <VTestHeader :data="data" @next-serie="executeTest.nextSerie()">
      <template #timer>
        <div h-10 flex gap-2 items-center justify-between w-7rem>
          <vue-countdown text-slate-600 :class="visibleTimer ? 'opacity-0' : 'opacity-100'" text-xl :time="timeCountdown"
            v-slot="{ minutes, seconds }" @end="timeOver()">
            {{ minutes > 9 ? minutes : `0` + minutes }}:{{
              seconds > 9 ? seconds : `0` + seconds
            }}
          </vue-countdown>
          <Button w-3rem @click="visibleTimer = !visibleTimer" icon="pi pi-clock" severity="secondary"></Button>
        </div>

      </template>
    </VTestHeader>
    <div relative h-full overflow-auto max-w-full px-4 lg:px-16 py-2 rounded-xl w-full>

      <VError v-if="isError" />
      <div v-else style="width: 100%; height: 100vh">

        <div class="test" v-if="isSuccess">



          <div class="test__content">
            <VButtonsContainer>
              <Button fluid @click="executeTest.validateTest(test)" icon="pi pi-file-check"
                v-tooltip.right="t('execute-test.tooltips.save')" />

              <Button @click="executeTest.exitTestConfirm('select-test')"
                v-tooltip.right="t('execute-test.tooltips.exit')" icon="pi pi-times" />
            </VButtonsContainer>


            <VTestSerie :serie="data.series[executeTest.serieIndex.value]" />

          </div>
        </div>
        <VLoading v-else />
      </div>
    </div>
    <Dialog v-model:visible="executeTest.infoVisible.value" modal :header="t('global.info')" style="width: 50%">
      <span class="modal__long-message">
        <span font-bold>{{ $t("execute-test.dialogs.description.title") }}:</span>
        {{ data.description }} <br />{{
          $t("execute-test.dialogs.description.message")
        }} </span>
    </Dialog>

  </section>


</template>

@/common/utils/validateAnswers ./getErrorMessages
