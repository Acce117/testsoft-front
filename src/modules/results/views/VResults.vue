<template>
  <h2 page-title>{{ $t("results.title") }}</h2>
  <VError v-if="error" />
  <section v-else-if="!loading" centered>
    <h2 page-subtitle v-if="Object.keys(result).length == 0">
      {{ $t("results.no-test") }}
    </h2>
    <div class="table-card" shadow-box>
      <DataTable
        :value="result"
        v-model:expandedRows="expandedRows"
        :size="'large'"
        ><template #header>
          <div class="table__header">
            <span class="p-ripple" v-ripple @click="expandAll()">
              + {{ $t("results.show-all") }}
            </span>
            <span class="p-ripple" v-ripple @click="collapseAll()">
              - {{ $t("results.hide-all") }}
            </span>
          </div>
        </template>
        <Column expander style="width: 4rem" header=" " />
        <Column field="test.name" :header="t('results.test')"></Column>
        <Column field="date" :header="t('results.date')"></Column>
        <Column :header="t('results.final-results')"
          ><template #body="slotProps">
            <div pa-1rem centered>
              <button
                black-button
                class="p-ripple"
                v-ripple
                @click="
                  getFinalResults(
                    slotProps.data.id_test_application,
                    slotProps.data.test.name,
                    slotProps.data.test.fk_id_type_test
                  )
                "
              >
                <img src="/img/test_completed.svg" />
              </button>
            </div> </template
        ></Column>
        <template #expansion="slotProps">
          <div overflow-hidden>
            <div anim-slide-in-from-top-table-0.2>
              <h4 font-bold>{{ $t("results.results-of") }} {{ slotProps.data.test.name }}</h4>
              <DataTable :value="slotProps.data.arrayapplication_result">
                <Column field="item.name" :header="t('results.name')"></Column>
                <Column field="value_result" :header="t('results.value')"></Column>
              </DataTable>
            </div>
          </div>
        </template>
      </DataTable>
    </div>
  </section>

  <VLoading v-else />
</template>
<script setup lang="ts">
import DataTable from "primevue/datatable";
import VShowFinalResults from "./VShowFinalResults.vue";
import Column from "primevue/column";
import { getResults } from "./../results.ts";
import { userStore } from "@/modules/security/store/user-store";
import { ref, provide, watch, onUnmounted } from "vue";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
const { t } =useI18n()
const toast = useToast();
const dialog = useDialog();
provide("dialogRef", dialog);
const { result, loading, error } = getResults(userStore().ci);
const expandedRows = ref([]);
const expandAll = () => {
  expandedRows.value = result.value;
};
const collapseAll = () => {
  expandedRows.value = null;
};

const getFinalResults = (
  id: number | string,
  name: string,
  fk_id_type_test: number | string
) => {
  dialog.open(VShowFinalResults, {
    props: {
      header: "Resultados",
      modal: true,
    },
    templates: {},
    data: {
      id,
      name,
      fk_id_type_test,
    },
  });
};
watch(result, (newValue) => {
  if (newValue.length > 0) {
    toast.add({
      severity: "info",
      summary: "Tip",
      detail:
        "En esta pantalla puede consultar los resultados de sus tests. Presione la flecha a la izquierda de una fila para mostrar los resultados generales del test correspondiente, o el botón de la derecha para ver los resultados finales del mismo.",
      life: 30000,
    });
    toast.add({
      severity: "info",
      summary: "Tip",
      detail:
        "Utilice los botones del encabezado para mostrar los resultados de todos los tests o para esconderlos.",
      life: 30000,
    });
  }
});
onUnmounted(() => {
  toast.removeAllGroups();
});
</script>
<style>
.table-card {
  width: 80%;
  padding: 1rem;
  margin: 2rem;
  max-width: 100rem;
  overflow: hidden;
}

.p-datatable-wrapper,
.table__header span {
  font-size: 1.5rem;
}
.p-column-title {
  font-weight: bold;
}

.p-row-toggler:hover {
  transform: scale(1);
}
.table__header {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 2rem;
  padding: 1rem;
}

.table__header span {
  cursor: pointer;
  border-radius: 1rem;
  padding: 0.5rem;
  font-weight: bold;
  transition: all ease 0.3s;
}
.table__header span:hover {
  background-color: rgb(222, 222, 222);
}

@media (min-width: 1024px) {
  .p-datatable-wrapper,
  .table__header span {
    font-size: 1.8rem;
  }
}
</style>
