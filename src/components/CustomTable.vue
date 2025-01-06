<template>
    <Card>
        <template #content>

            <DataTable removableSort ref="dt" size="small" tableStyle="min-width: 50rem"
                :globalFilterFields="props.model.getColumns().map((c) => c.field)" v-model:filters="filters"
                filterDisplay="row" paginator :value="data" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">


                <template #header>
                    <div class="custom-table-header">
                        <h1 text-xl m-0 font-semibold>{{ title }}</h1>
                        <div class="custom-table-header__options">
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText w-12rem lg:w-20rem v-model="filters['global'].value"
                                    :placeholder="$t('table.search')" />
                            </IconField>
                            <div flex gap-2>
                                <Button v-if="!props.hideCreate" icon="pi pi-plus" @click="showAdd()" />

                                <Button icon="pi pi-external-link" @click="toggle" aria-haspopup="true"
                                    aria-controls="overlay_menu" severity="secondary" />
                                <Menu ref="menu" id="overlay_menu" :model="exportOptions" :popup="true" />

                                <Button icon="pi pi-refresh" severity="secondary" @click="refetch()" />
                            </div>

                        </div>
                    </div>

                </template>
                <Column v-for="(col, index) in props.model.getColumns()" :key="index" sortable :field="col.field"
                    :header="col.header">


                    <template #body="slotProps">

                        <Skeleton v-if="isRefetching || isPending" width="60%" borderRadius=".4rem" height="1.5rem" />
                        <div overflow-auto text-sm v-else-if="col.fieldGetter">
                            <Rating v-if="col.isRating" :modelValue="slotProps.data[col.fieldGetter(slotProps.data)]"
                                readonly />
                            <span v-else-if="col.isBoolean">{{
                                col.fieldGetter(slotProps.data) == true ? t('yes') : t('no') }}</span>
                            <span v-else-if="col.fieldGetter(slotProps.data) !== undefined">{{ typeof
                                col.fieldGetter(slotProps.data) == 'string' ? col.fieldGetter(slotProps.data).length <
                                    20 ? col.fieldGetter(slotProps.data) : col.fieldGetter(slotProps.data).substring(0,
                                        20) + '...' : col.fieldGetter(slotProps.data) }}</span>
                                    <span v-else>-</span>
                        </div>
                        <div overflow-auto text-sm v-else>
                            <Rating v-if="col.isRating" :modelValue="slotProps.data[col.field]" readonly />
                            <span v-else-if="col.isBoolean || col.field === props.model.getFieldAsActive()">{{
                                slotProps.data[col.field] == true ? t('yes') : t('no') }}</span>
                            <span v-else-if="slotProps.data[col.field] !== undefined">{{ typeof
                                slotProps.data[col.field] == 'string' ? slotProps.data[col.field].length < 20 ?
                                slotProps.data[col.field] : slotProps.data[col.field].substring(0, 20) + '...' :
                                slotProps.data[col.field] }}</span>
                                    <span v-else>-</span>
                        </div>

                    </template>

                </Column>
                <Column v-if="!props.hideActions" :field="fieldAsID" :header="$t('table.actions')">

                    <template #body=slotProps>
                        <Skeleton v-if="isRefetching || isPending" width="60%" borderRadius=".4rem" height="1.5rem" />

                        <div v-else class="custom-table-actions">
                            <i class="pi pi-eye" v-if="!props.hideShow" v-tooltip="$t('table.view_information')"
                                @click="showElement(slotProps.data)" />
                            <i class="pi pi-file-edit" v-if="!props.hideEdit" v-tooltip="$t('table.update')"
                                @click="showUpdate(slotProps.data)" />
                            <div v-if="!props.hideDelete">


                                <i v-if="props.model.getFieldAsActive() == ''" v-tooltip="$t('table.delete')"
                                    @click="deleteElement($event, slotProps.data)" class="pi pi-trash" />
                                <i v-else-if="slotProps.data[props.model.getFieldAsActive()] == true || slotProps.data[props.model.getFieldAsActive()] == 1"
                                    v-tooltip="$t('table.desactivate')"
                                    @click="desactivateElement($event, slotProps.data)" class="pi pi-trash" />

                                <i v-else-if="slotProps.data[props.model.getFieldAsActive()] == false || slotProps.data[props.model.getFieldAsActive()] == 0"
                                    v-tooltip="$t('table.recover')" @click="activateElement($event, slotProps.data)"
                                    class="pi pi-history" />
                            </div>


                        </div>
                    </template>
                </Column>
                <template #empty> {{ $t('table.no_results') }} </template>

            </DataTable>
            <!-- <h2 v-if="isError" class="error">{{ $t('table.something_wrong') }}</h2> -->
        </template>
    </Card>

    <Dialog v-model:visible="showInfoDialog" modal :header="$t('table.information')"
        class="w-4/5 max-w-50rem min-w-25rem min-h-15rem">

        <LoadingPanel v-if="isPendingOfOne || isRefetchingOfOne || isErrorOfOne" centered relative :loading="isPendingOfOne || isRefetchingOfOne" :error="isErrorOfOne"
            :refetch="refetchOfOne" />

        <div v-else-if="isSuccessOfOne" class="dialog-form">
            <slot name="view-element" :dataOfOne :isPendingOfOne :isErrorOfOne :model></slot>
            <div class="flex justify-end gap-2">
                <Button type="button" :label="$t('table.accepts')" @click="showInfoDialog = false"></Button>
            </div>
        </div>
    </Dialog>
    <Dialog v-model:visible="showAddDialog" modal :header="$t('table.add')" class="w-4/5 max-w-50rem min-w-25rem">

        <span>{{ $t('table.new_element') }}</span>
        <Form @submit="addElement" :validation-schema="props.model.getSchema()">
            <div class="dialog-form">
                <slot name="form-add"></slot>

            </div>

            <div class="dialog-footer">
                <Button type="button" :label="$t('table.cancel')" severity="secondary"
                    @click="showAddDialog = false"></Button>
                <VButton w-8rem :disabled="isAddPending || isFormDataLoading" type="submit">
                    <span v-if="!isAddPending || isFormDataLoading">{{ $t("table.save") }} </span>
                    <VLoading v-else />
                </VButton>
            </div>
        </Form>

    </Dialog>

    <Dialog v-model:visible="showUpdateDialog" modal :header="$t('table.update')" class="w-4/5 max-w-50rem min-w-25rem">
        <span>{{ $t('table.update_element') }}</span>
        <Form @submit="updateElement" :validation-schema="props.model.getUpdateSchema()">
            <div class="dialog-form">
                <slot name="form-update"></slot>
            </div>
            <div class="dialog-footer">
                <Button type="button" :label="$t('table.cancel')" severity="secondary"
                    @click="showUpdateDialog = false"></Button>
                <VButton w-8rem :disabled="isUpdatePending || isFormDataLoading" type="submit">
                    <span v-if="!isUpdatePending || isFormDataLoading">{{ $t("table.save") }} </span>
                    <VLoading v-else />
                </VButton>
            </div>
        </Form>
    </Dialog>
</template>
<script setup lang="ts">
import Column from 'primevue/column';
import { Form } from 'vee-validate';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { FilterMatchMode } from '@primevue/core/api';
import { ref, watch } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import Rating from 'primevue/rating';
import Menu from 'primevue/menu';
import { useI18n } from 'vue-i18n';
import { BaseModel } from '@/core/BaseModel';
import Skeleton from 'primevue/skeleton';
import VButton from './VButton.vue';
import LoadingPanel from './LoadingPanel.vue';

useQueryClient()
const props = defineProps({
    title: String,
    model: {
        type: BaseModel,
        required: true
    },
    customAddFunction: Function,
    customUpdateFunction: Function,
    customGetOneFunction: Function,
    queryOptions: Object,
    isFormDataLoading: Boolean,
    hideActions: Boolean,
    hideShow: Boolean,
    hideEdit: Boolean,
    hideCreate: Boolean,
    hideDelete: Boolean,

})
const fieldAsID = props.model.getFieldAsID()
const queryKey = props.model.constructor.name
const confirm = useConfirm();
const toast = useToast();
const menu = ref();
const toggle = (value: MouseEvent) => {
    menu.value.toggle(value);
};
const { data, isPending, isSuccess, isError, isRefetching, refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: () => {
        return props.model.getAll(props.queryOptions)
    }
})

const { data: dataOfOne, isPending: isPendingOfOne, isSuccess: isSuccessOfOne, isError: isErrorOfOne, isRefetching: isRefetchingOfOne, refetch: refetchOfOne } = useQuery({
    queryKey: [queryKey + '-one'],
    queryFn: () => {
        return props.customGetOneFunction ? props.customGetOneFunction(props.model.getID()) : props.model.getOne(props.queryOptions)
    },
    enabled: false
})

watch(dataOfOne, (newValue) => {
    props.model.setData(newValue)
})


const dt = ref();



const { t } = useI18n();

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

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const selectedRowInfo = ref()

const showInfoDialog = ref(false)

const showAdd = () => {
    if (props.customAddFunction)
        props.customAddFunction()
    else
        showAddDialog.value = true
    props.model.clearData()

}

const showElement = (data: object) => {
    props.model.setData(data)
    showInfoDialog.value = true
    refetchOfOne()
}

const showUpdateDialog = ref(false)

const showUpdate = (data: object) => {
    props.model.setData(data)

    if (props.customUpdateFunction)
        props.customUpdateFunction(props.model.getID())
    else
        showUpdateDialog.value = true

}

const showAddDialog = ref(false)


const addElement = () => {
    mutateAdd()
}
const updateElement = (data: object) => {
    mutateUpdate(data)
}

const deleteElement = (event, data) => {

    confirm.require({
        target: event.currentTarget,
        message: t('table.delete_element_ask'),
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: t('table.cancel'),
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: t('table.accept')
        },
        accept: () => {
            props.model.setData(data)
            mutateDelete()
        },
    });
};
const desactivateElement = (event, data: object) => {

    confirm.require({
        target: event.currentTarget,
        message: t('table.desactivate_element_ask'),
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: t('table.cancel'),
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: t('table.accept')
        },
        accept: () => {
            let updateObject = { ...data }
            // for (const key in updateObject) {
            //     if (key.includes('date'))
            //         updateObject[key] = parseDate(updateObject[key]);
            // }
            updateObject[props.model.getFieldAsActive()] = 0
            props.model.setData(updateObject)
            mutateUpdate(updateObject)
        },
    });
};
const activateElement = (event, data: object) => {

    confirm.require({
        target: event.currentTarget,
        message: t('table.activate_element_ask'),
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: t('table.cancel'),
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: t('table.accept')
        },
        accept: () => {
            let updateObject = { ...data }
            // for (const key in updateObject) {
            //     if (key.includes('date'))
            //         updateObject[key] = parseDate(updateObject[key]);
            // }

            updateObject[props.model.getFieldAsActive()] = 1
            props.model.setData(updateObject)

            mutateUpdate(updateObject)
        },
    });
};

//

const { mutate: mutateAdd, isPending: isAddPending } = useMutation({
    mutationKey: [`${queryKey}-add`],
    mutationFn: () => props.model.create(),
    onSuccess: async () => {
        await refetch()
        toast.add({ severity: 'info', summary: t('table.confirmation'), detail: t('table.element_ok_added'), life: 5000 });
        showAddDialog.value = false
        props.model.clearData()
    },
    onError: (error) => {
        toast.add({ severity: 'error', summary: t('table.something_wrong'), detail: t(error.message), life: 5000 });
    }
})


const { mutate: mutateUpdate, isPending: isUpdatePending } = useMutation({
    mutationKey: [`${queryKey}-update`],
    mutationFn: (data: object) => props.model.update(data),
    onSuccess: async () => {
        await refetch()
        toast.add({ severity: 'info', summary: t('table.confirmation'), detail: t('table.element_ok_updated'), life: 5000 });
        showUpdateDialog.value = false
        props.model.clearData()
    },
    onError: (error) => {
        toast.add({ severity: 'error', summary: t('table.something_wrong'), detail: error.statusCode == 404 ? t('table.relations_error') : t(error.message), life: 5000 });
    }
})




const { mutate: mutateDelete } = useMutation({
    mutationKey: [`${queryKey}-delete`],
    mutationFn: () => props.model.delete(),
    onSuccess: async () => {
        await refetch()
        toast.add({ severity: 'info', summary: t('table.confirmation'), detail: t('table.element_ok_deleted'), life: 5000 });
        props.model.clearData()
    },
    onError: async (error) => {
        // if (error instanceof EmailError) {
        //     await refetch()

        //     toast.add({ severity: 'info', summary: t('table.confirmation'), detail: t('table.element_ok_deleted'), life: 5000 });

        //     toast.add({ severity: 'error', summary: t('table.something_wrong'), detail:t(error.message), life: 5000 });

        // } else
        toast.add({ severity: 'error', summary: t('table.something_wrong'), detail: t(error.message), life: 5000 });
    }
})



</script>
<style>
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
    gap: .5rem;
}

.custom-table-actions .pi {
    color: var(--p-button-primary-background);
    cursor: pointer;
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
</style>