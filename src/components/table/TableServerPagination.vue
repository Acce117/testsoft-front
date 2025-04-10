<template>
    <Card overflow-auto h-full>
        <template #content>
            <LoadingPanel v-if="isPending"  centered
            :loading="isPending" :error="isError" :refetch="refetch" />

            <DataTable :class="internDatatable? 'intern-datatable':''" v-model:expandedRows="expandedRows" scrollable v-model:filters="filters" :lazy="true"
                @filter="onFilter" filterDisplay="menu" scrollHeight="flex" removableSort ref="dt" size="small"
                tableStyle="min-width: 50rem" :value="tableData" :rows="5" >


                <template #header>
                    {{ filtersForServer }}
                    <div class="custom-table-header">
                        <h1 text-xl m-0 font-semibold>{{ $t(props.title ? props.title : '') }}</h1>
                        <div class="custom-table-header__options">
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <!-- <InputText w-12rem lg:w-20rem v-model="filters['global'].value"
                                    :placeholder="$t('table.search')" /> -->
                            </IconField>
                            <slot name="header"></slot>
                            <div flex gap-2>
                                <CreateButton v-if="props.visibleCreateButton"
                                    @show-create-dialog="createDialogVisible = true"
                                    :customFunction="props.customAddFunction" />


                                <Button icon="pi pi-download" variant="outlined"  @click="toggle" aria-haspopup="true"
                                    aria-controls="overlay_menu" severity="info"  />
                                <Menu ref="menu" id="overlay_menu" :model="exportOptions" :popup="true" />

                                <Button icon="pi pi-refresh" variant="outlined" severity="info" @click="refetch()" />
                            </div>

                        </div>
                    </div>

                </template>
                <Column expander v-if="hasExpander" style="width: 1rem" />
                <div v-for="(col, index) in props.model.getColumns()" :key="index">

                    <Column v-if="!col.isActionsColumn" :filterField="col.field" sortable :field="col.field"
                        :header="$t(col.header)" :filterMatchModeOptions="filterOptions">


                        <template #body="slotProps">
                            <Skeleton v-if="isRefetching || isPending" width="60%" borderRadius=".4rem"
                                height="1.5rem" />
                            <template v-else-if="col.fieldGetter">
                                <Rating v-if="col.isRating"
                                    :modelValue="slotProps.data[col.fieldGetter(slotProps.data)]" readonly />
                                <template v-else-if="col.isBoolean">{{
                                    col.fieldGetter(slotProps.data) == true ? t('global.yes') : t('global.no') }}</template>
                                <template v-else-if="col.fieldGetter(slotProps.data) !== undefined">{{col.fieldGetter(slotProps.data) }}</template>
                                        <template v-else>-</template>
                            </template>
                            <template  v-else>
                                <Rating v-if="col.isRating" :modelValue="slotProps.data[col.field]" readonly />
                                <template v-else-if="col.isBoolean || col.field === props.model.getFieldAsActive()">
                                    <Tag  v-if="slotProps.data[col.field] == true" severity="success"
                                        :value="$t('global.yes')" />
                                    <Tag v-else severity="danger" :value="$t('global.no')" />

                                </template>
                                <template v-else-if="slotProps.data[col.field] !== undefined">{{slotProps.data[col.field] }}</template>
                                        <template v-else>-</template>
                            </template>

                        </template>
                        <template v-if="col.filter" #filter="{ filterModel, filterCallback }">
                            <slot v-if="col.customFilterTemplate"
                                :name="'custom-filter-template-' + col.customFilterTemplate" :filterModel
                                :filterCallback>
                            </slot>
                            <IconField v-else>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText v-model="filterModel.value" @keyup.enter="filterCallback()"
                                    placeholder="Buscar" />
                            </IconField>

                        </template>



                    </Column>
                    <Column v-else-if="visibleActions" :field="fieldAsID" :header="$t('table.actions')">

                        <template #body=slotProps>
                            <Skeleton v-if="isRefetching || isPending" width="60%" borderRadius=".4rem"
                                height="1.5rem" />

                            <div v-else class="custom-table-actions">
                                <ViewButton :data-to-show="slotProps.data" v-if="props.visibleViewButton &&
                                    (isLogicErase ? slotProps.data[props.model.getFieldAsActive()] == true : true)
                                    && (col.visibleViewFunction ? col.visibleViewFunction(slotProps.data) : true)"
                                    :refetch="refetchOfOne" @show-view-dialog="viewDialogVisible = true" />

                                <UpdateButton :data-to-update="slotProps.data"
                                    v-if="props.visibleUpdateButton &&
                                        (isLogicErase ? slotProps.data[props.model.getFieldAsActive()] == true : true)
                                        && (col.visibleUpdateFunction ? col.visibleUpdateFunction(slotProps.data) : true)"
                                    @show-update-dialog="updateDialogVisible = true"
                                    :custom-function="customUpdateFunction" />
                                <template
                                    v-if="props.visibleDeleteButton && (col.visibleDeleteFunction ? col.visibleDeleteFunction(slotProps.data) : true)">

                                    <DeleteButton :data-to-delete="slotProps.data" v-if="!isLogicErase" />

                                    <ActivateButton :data-to-activate="slotProps.data"
                                        v-else-if="slotProps.data[props.model.getFieldAsActive()] == false" />
                                    <DesactivateButton :data-to-desactivate="slotProps.data" v-else />
                                </template>
                                <template v-if="props.extraOptions">
                                    <template v-for="option in props.extraOptions" :key="option">
                                        <Button v-if="option.renderIf(slotProps.data)" :severity="option.severity" rounded variant="text" :icon="'pi '+option.icon"
                                            v-tooltip="$t(option.tooltip)"
                                            @click="option.action(slotProps.data, $event)" />
                                    </template>
                                </template>


                            </div>
                        </template>
                    </Column>
                </div>


                <template #empty>
                    <span v-if="isError">{{ $t('errors.title') }}</span>
                    <span v-else id="empty-message">{{ $t('table.no_results') }}</span>
                </template>
                <template #expansion="slotProps">
                    <slot name="expansion" :slotProps></slot>
                </template>
                <template #footer>
                    <Paginator :rows="limit" @page="(e) => {
                        console.log(e)
                        offset = e.first
                        limit = e.rows
                        refetch()
                    }" :totalRecords="totalRecords" :rowsPerPageOptions="[1, 10, 20, 30]">
                        <!-- <template #start="slotProps">
                            Mostrando {{ slotProps.state.rows > totalRecords ? totalRecords : slotProps.state.rows }} de
                            {{
                                totalRecords }} elementos

                            , Primer elemento: {{ slotProps.state.first + 1 }}


                        </template>
<template #end="slotProps">
                            Página: {{ slotProps.state.page + 1 }} de {{ totalPages }}
                        </template> -->
                    </Paginator>
                </template>
            </DataTable>
        </template>
    </Card>

    <CreateDialog v-model="createDialogVisible">
        <template #form>
            <slot name="form-add"></slot>
        </template>
    </CreateDialog>

    <ViewDialog v-model="viewDialogVisible">
        <template #view-element>
            <slot name="view-element" :dataOfOne :isPendingOfOne :isErrorOfOne :model></slot>
        </template>
    </ViewDialog>

    <UpdateDialog v-model="updateDialogVisible">
        <template #form>
            <slot name="form-update"></slot>
        </template>
    </UpdateDialog>


    <slot name="custom-dialog"></slot>


</template>
<script setup lang="ts">
import Column from 'primevue/column';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { provide, ref, watch, watchEffect } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import Rating from 'primevue/rating';
import Menu from 'primevue/menu';
import { useI18n } from 'vue-i18n';
import { BaseModel } from '@/common/utils/BaseModel';
import Skeleton from 'primevue/skeleton';
import Paginator from 'primevue/paginator';
import CreateButton from './components/create/CreateButton.vue';
import UpdateButton from './components/update/UpdateButton.vue';
import { useQueryOfOne } from './composable/useQueryOfOne';
import ViewButton from './components/view/ViewButton.vue';
import UpdateDialog from './components/update/UpdateDialog.vue';
import ViewDialog from './components/view/ViewDialog.vue';
import CreateDialog from './components/create/CreateDialog.vue';
import DeleteButton from './components/delete/DeleteButton.vue';
import ActivateButton from './components/logic_delete/ActivateButton.vue';
import DesactivateButton from './components/logic_delete/DesactivateButton.vue';
import { Tag } from 'primevue';
import LoadingPanel from '../LoadingPanel.vue';

useQueryClient()
const { t } = useI18n();


const props = defineProps({
    title: String,
    model: {
        type: BaseModel,
        required: true
    },
    hasExpander: Boolean,
    customAddFunction: Function,
    customUpdateFunction: Function,
    customGetAllFunction: Function,
    customGetOneFunction: Function,
    //validateBefore: Function,
    queryOptions: Object,
    extraOptions: Array<{ renderIf: (data: object) => boolean, tooltip: string, severity: string, icon: string, action: (data: BaseModel, event: MouseEvent) => void }>,
    isFormDataLoading: Boolean,
    visibleActions: {
        type: Boolean,
        default: true
    },
    visibleViewButton: {
        type: Boolean,
        default: true
    },
    visibleUpdateButton: {
        type: Boolean,
        default: true
    },
    visibleCreateButton: {
        type: Boolean,
        default: true
    },
    visibleDeleteButton: {
        type: Boolean,
        default: true
    },
    internDatatable:{
        type: Boolean,
        default: false
    }

})
const limit = ref(10)
const offset = ref(0)
const totalRecords = ref(0)
const totalPages = ref(0)
const dt = ref();
const tableData = ref()


const filters = ref({});

props.model.getFilters()?.forEach((f) => {
    filters.value[f.field] = { value: null, matchMode: 'contains' }

})

const filtersForServer = ref({});
const filterOptions = ref([
    { label: 'Contains', value: 'contains' }
])

const fieldAsID = props.model.getFieldAsID()
const queryKey = props.model.constructor.name

const menu = ref();
const expandedRows = ref()

const updateDialogVisible = ref(false)
const viewDialogVisible = ref(false)
const createDialogVisible = ref(false)


provide('queryKey', queryKey)
provide('model', props.model)
provide('isFormDataLoading', props.isFormDataLoading)


const onFilter = (event) => {
    filtersForServer.value = {}
    Object.entries(event.filters).map((f) => {
        if (f[1].value)
            filtersForServer.value[f[0]] = f[1].value
    })
    refetch()
}



const toggle = (value: MouseEvent) => {
    menu.value.toggle(value);
};
const { data, isPending, isSuccess, isRefetching, isError, refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: (parameter?) => {
        console.log(parseInt(offset.value))
        return props.customGetAllFunction ?
            props.customGetAllFunction(
                {
                    limit: limit.value,
                    offset: offset.value,
                    where: filtersForServer.value,
                    ...props.queryOptions
                }
            ) :
            props.model.getAll(
                {
                    limit: limit.value,
                    offset: offset.value,
                    where: filtersForServer.value,
                    ...props.queryOptions
                }
            )
    },

})

const { dataOfOne, isPendingOfOne, isErrorOfOne, refetchOfOne } = useQueryOfOne(queryKey, props.model, props.queryOptions)


const isLogicErase = props.model.getFieldAsActive() != ''


const exportOptions = ref([
    {
        label: t('table.options'),
        items: [
            {
                label: 'CSV',
                icon: 'pi pi-file-excel',
                command: () => dt.value.exportCSV()
            }
        ]
    }
]);




// const parseData = (data) => {
//     for (const key in data) {
//         if (Object.prototype.hasOwnProperty.call(props.model, key)) {
//             // if (key.includes('date'))
//             //     props.queryOptions.model.value[key] = parseDate(data[key]);
//             // else
//             props.model.value[key] = data[key];
//         }
//     }
// }

// if (props.queryOptions.requestPDF) {
//     exportOptions.value[0].items.push(
//         {
//             label: 'PDF',
//             icon: 'pi pi-file-pdf',
//             command: async () => await props.queryOptions.requestPDF()
//         })
// }


watch(dataOfOne, (newValue) => {
    console.log(newValue)
    props.model.setData(newValue)
})

watchEffect(() => {
    if (isSuccess.value && !isPending.value && !isRefetching.value) {

        totalRecords.value = data.value.elements_amount
        totalPages.value = data.value.pages
        tableData.value = data.value.data
    }
});

defineExpose({ refetch })

</script>
<style>
.p-card-body,
.p-card-content,
.p-datatable {
    height: 100% !important;
}

.p-datatable-filter-constraint-dropdown {
    display: none !important;
}

.custom-table-header {
    display: flex;
    flex-direction: column;
    gap: 1rem;

}

.custom-table-header__options {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 1rem;
}

.custom-table-actions {
    display: flex;
    width: 100%;
    align-items: center;
}



.dialog-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 1.5rem 0;
}

.dialog-footer {
    display: flex;
    gap: 1.5rem;
    justify-content: space-between;
}

.loading,
.error {
    display: flex;
    align-items: center;
    justify-content: center;
}
td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
}
.p-datatable-thead{
    z-index: 2 !important;
}
.intern-datatable .p-datatable-thead{
    z-index: 1 !important;
}
</style>