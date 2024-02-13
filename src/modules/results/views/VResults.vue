<template>
  <h2 class="page-title">Resultados</h2>
  <div class="results">
    <DataTable :value="result.result" tableStyle="width: 70rem" :size="'large'"  showGridlines  >
      <Column field="fk_item" header="Elemento"></Column>
      <Column field="value_result" header="Resultado"></Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { getResults } from "./../results.ts";
import { ref } from "vue";
const result = ref();
result.value = getResults();
</script>
<style>
.results{
    display:flex;
    justify-content:center;
}
.p-datatable-wrapper {
  height: 30rem;
  font-size:1.5rem;
  border-radius:1.5rem;
}
.p-column-header-content{
    background-color:black;
    color:white;
}
</style>
