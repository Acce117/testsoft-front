<template>
  <h2 class="page-title">Resultados</h2>
  <div class="centered" style="width: 100%">
    <VError v-if="error" />
    <div v-else class="centered" style="width: 100%">
      <VLoading v-if="loading" />
      <h2 class="page-subtitle" v-else-if="Object.keys(result).length == 0">
        No ha realizado ningún test
      </h2>
      <div v-else class="table-card box-shadow-box">
        <DataTable
          :value="result"
          v-model:expandedRows="expandedRows"
          :size="'large'"
          ><template #header>
            <div class="table__header">
              <span class="p-ripple" v-ripple @click="expandAll()">
                + Expandir Todos
              </span>
              <span class="p-ripple" v-ripple @click="collapseAll()">
                - Reducir Todos
              </span>
            </div>
          </template>
          <Column expander style="width: 4rem" header=" " />
          <Column field="test.name" header="Test"></Column>
          <Column field="date" header="Fecha"></Column>
          <Column header="Ver Resultados Finales"
            ><template #body="slotProps">
              <div class="test-final-results centered">
                <button
                  class="black-button p-ripple"
                  v-ripple
                  @click="getFinalResults(slotProps.data.id_test_application, slotProps.data.test.name)"
                >
                  <img src="/img/test_completed.svg" />
                </button>
              </div> </template
          ></Column>
          <template #expansion="slotProps">
            <div class="table-expansion">
              <div>
                <h4 style="font-weight: bold">
                  Resultados de {{ slotProps.data.test.name }}
                </h4>
                <DataTable :value="slotProps.data.arrayapplication_result">
                  <Column field="item.name" header="Nombre"></Column>
                  <Column field="value_result" header="Valor"></Column>
                </DataTable>
              </div>
            </div>
          </template>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import DataTable from "primevue/datatable";
import VShowFinalResults from './VShowFinalResults.vue'
import Column from "primevue/column";
import { getResults } from "./../results.ts";
import { userStore } from "@/modules/security/store/user-store";
import { ref, provide, onMounted } from "vue";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
const toast = useToast()
const dialog = useDialog()
provide("dialogRef", dialog);
const { result, loading, error } = getResults(userStore().ci);
const expandedRows = ref([]);
const expandAll = () => {
  console.log(expandedRows.value);
  expandedRows.value = result.value;
};
const collapseAll = () => {
  expandedRows.value = null;
};

const getFinalResults = (id:number|string, name:string) => {
 
    dialog.open(VShowFinalResults, {
    props: {
      header: "Resultados",
      modal: true,
    },
    templates: {},
    data: {
      id,
      name
    },
  });
};
onMounted(() => {
  toast.add({
      severity: "info",
      summary: "Tip",
      detail: "En esta pantalla puede consultar los resultados de sus tests. Presione la flecha a la izquierda de una fila para mostrar los resultados generales del test correspondiente, o el botón de la derecha para ver los resultados finales del mismo.",
      life: 30000,
    }
    );
    toast.add({
      severity: "info",
      summary: "Tip",
      detail: "Utilice los botones del encabezado para mostrar los resultados de todos los tests o para esconderlos.",
      life: 30000,
    });
})
</script>
<style>
.results {
  display: flex;
  justify-content: center;
  width: 100%;
}
.table-card {
  width: 80%;
  padding: 1rem;
  margin: 2rem;
  max-width: 100rem;
  overflow: hidden;
}
.table-expansion {
  overflow: hidden;
}
.table-expansion div {
  animation: 0.2s slide-in-from-top-table linear;
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
.test-final-results {
  padding: 1rem;
}
@media (min-width: 1024px) {
  .p-datatable-wrapper,
  .table__header span {
    font-size: 1.8rem;
  }
}
</style>
