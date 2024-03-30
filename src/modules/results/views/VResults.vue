<template>
  <h2 page-title>{{ $t("results.title") }}</h2>
  <VTable :loading="loading" :error="error">
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
            <h4 font-bold>
              {{ $t("results.results-of") }} {{ slotProps.data.test.name }}
            </h4>
            <DataTable :value="slotProps.data.arrayapplication_result">
              <Column field="item.name" :header="t('results.name')"></Column>
              <Column
                field="value_result"
                :header="t('results.value')"
              ></Column>
            </DataTable>
          </div>
        </div>
      </template>
      <template #empty> {{ $t("global.no-results") }} </template>
    </DataTable>
    <VButtonsContainer top-6rem right-10vw>
      
          <VInfoButton
          >
           {{ $t('results.info') }}
          </VInfoButton>

        </VButtonsContainer>
  </VTable>
</template>
<script setup lang="ts">
import VTable from "@/components/VTable.vue";
import DataTable from "primevue/datatable";
import VShowFinalResults from "./VShowFinalResults.vue";
import Column from "primevue/column";
import VInfoButton from "@/components/buttons/VInfoButton.vue";
import VButtonsContainer from "@/components/buttons/VButtonsContainer.vue";
import { getResults } from "./../results.ts";
import { userStore } from "@/modules/security/store/user-store";
import { ref, provide, onUnmounted } from "vue";
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
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

onUnmounted(() => {
  toast.removeAllGroups();
});
</script>
