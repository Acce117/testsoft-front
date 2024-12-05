<template>
    <Card >
        <template #content>

            <DataTable removableSort ref="dt" size="small"  tableStyle="min-width: 50rem"
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
                                <Button icon="pi pi-plus" @click="showAdd()" />

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
                        <div overflow-auto text-sm v-else>
                            <Rating v-if="col.isRating" :modelValue="slotProps.data[col.field]" readonly />
                            <span v-else-if="col.isBoolean || col.field === fieldAsActive">{{
                                slotProps.data[col.field] == true ? t('yes') : t('no') }}</span>
                            <span v-else-if="slotProps.data[col.field] !== undefined">{{ typeof
                                slotProps.data[col.field] == 'string' ? slotProps.data[col.field].length < 20 ?
                                slotProps.data[col.field] : slotProps.data[col.field].substring(0, 20) +'...':
                                    slotProps.data[col.field] }}</span>
                                    <span v-else>-</span>
                        </div>

                    </template>

                </Column>
                <Column :field="fieldAsID" :header="$t('table.actions')">

                    <template #body=slotProps>
                        <Skeleton v-if="isRefetching || isPending" width="60%" borderRadius=".4rem" height="1.5rem" />

                        <div v-else class="custom-table-actions">
                            <i class="pi pi-eye" v-tooltip="$t('table.view_information')"
                                @click="showElement(slotProps.data)" />
                            <i class="pi pi-file-edit" v-tooltip="$t('table.update')"
                                @click="showUpdate(slotProps.data)" />

                            <!-- <i v-if="!props.fieldAsActive" v-tooltip="$t('table.delete')"
                                @click="deleteElement($event, slotProps.data)" class="pi pi-trash" />
                            <i v-if="slotProps.data[props.fieldAsActive] == true" v-tooltip="$t('table.desactivate')"
                                @click="desactivateElement($event, slotProps.data)" class="pi pi-trash" />

                            <i v-if="slotProps.data[props.fieldAsActive] == false" v-tooltip="$t('table.recover')"
                                @click="activateElement($event, slotProps.data)" class="pi pi-history" /> -->

                        </div>
                    </template>
                </Column>
                <template #empty> {{ $t('table.no_results') }} </template>

            </DataTable>
            <!-- <h2 v-else-if="isError" class="error">{{ $t('table.something_wrong') }}</h2> -->
        </template>
    </Card>

    <Dialog v-model:visible="showInfoDialog" modal :header="$t('table.information')"
        class="w-4/5 max-w-50rem min-w-25rem">
        <div w-full h-32 flex items-center justify-center v-if="isRefetchingOfOne || isPendingOfOne">
            <i class="pi pi-spinner pi-spin" style="font-size: 3rem" text-primary></i>

        </div>

        <div v-else-if="isSuccessOfOne" class="dialog-form">
            <slot name="view-element"></slot>
            <div class="flex justify-end gap-2">
                <Button type="button" :label="$t('table.accepts')" @click="showInfoDialog = false"></Button>
            </div>
        </div>
        <div v-else>
            <VError mode="primary">
                <Button type="button" icon="pi pi-refresh" :label="$t('table.retry')" @click="refetchOfOne()"></Button>
            </VError>

        </div>
    </Dialog>
    <Dialog v-model:visible="showAddDialog" modal :header="$t('table.add')" class="w-4/5 max-w-50rem min-w-25rem">

        <span>{{ $t('table.new_element') }}</span>
        <Form @submit="addElement" :validation-schema="props.model.getSchema()">
            <div class="dialog-form">
                <slot name="form-add"></slot>

                {{ model }}
            </div>

            <div class="dialog-footer">
                <Button type="button" :label="$t('table.cancel')" severity="secondary"
                    @click="showAddDialog = false"></Button>
                <Button type="submit" :label="$t('table.save')"></Button>
            </div>
        </Form>

    </Dialog>
    <Dialog v-model:visible="showUpdateDialog" modal :header="$t('table.update')" class="w-4/5 max-w-50rem min-w-25rem">
        <span>{{ $t('table.update_element') }}</span>
        <div class="dialog-form">
            <slot name="form-add"></slot>
        </div>
        <div class="dialog-footer">
            <Button type="button" :label="$t('table.cancel')" severity="secondary"
                @click="showUpdateDialog = false"></Button>
            <Button type="button" :label="$t('table.save')" @click="updateElement()"></Button>
        </div>
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
import VError from './VError.vue';

useQueryClient()
const props = defineProps({
    title: String,
    model: BaseModel,
    queryOptions: {
        requestPDF: Function
    },

})
const fieldAsID= props.model.getFieldAsID()
const queryKey = props.model.constructor.name
const confirm = useConfirm();
const toast = useToast();
const menu = ref();
const toggle = (event) => {
    menu.value.toggle(event);
};
const { data, isPending, isSuccess, isError, isRefetching, refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: () => {
        return props.model.getAll()
    }
})

const { data: dataOfOne, isPending: isPendingOfOne, isSuccess: isSuccessOfOne, isRefetching: isRefetchingOfOne, refetch: refetchOfOne } = useQuery({
    queryKey: [queryKey + '-one'],
    queryFn: () => {
        return props.model.getOne()
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

    showAddDialog.value = true
    props.model.clearData()
}

const showElement = (data) => {
    props.model.setData(data)
    showInfoDialog.value = true
    refetchOfOne()
}

const showUpdateDialog = ref(false)

const showUpdate = (data) => {
    props.model.setData(data)
    showUpdateDialog.value = true
}

const showAddDialog = ref(false)


const addElement = (values) => {
    mutateAdd(props.model)
}
const updateElement = () => {
    mutateUpdate(props.model)
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
const desactivateElement = (event, data) => {

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
            let updateObject = {}
            Object.assign(updateObject, data)
            // for (const key in updateObject) {
            //     if (key.includes('date'))
            //         updateObject[key] = parseDate(updateObject[key]);
            // }

            updateObject[props.fieldAsActive] = false;
            mutateUpdate({ id: data[props.fieldAsID], data: updateObject })
        },
    });
};
const activateElement = (event, data) => {

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
            let updateObject = {}
            Object.assign(updateObject, data)
            // for (const key in updateObject) {
            //     if (key.includes('date'))
            //         updateObject[key] = parseDate(updateObject[key]);
            // }

            updateObject[props.fieldAsActive] = true;
            mutateUpdate({ id: data[props.fieldAsID], data: updateObject })
        },
    });
};

//

const { mutate: mutateAdd } = useMutation({
    mutationKey: [`${queryKey}-add`],
    mutationFn: (data) => props.model.create(data),
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


const { mutate: mutateUpdate } = useMutation({
    mutationKey: [`${queryKey}-update`],
    mutationFn: (data) => props.model.update(data),
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
    mutationFn: props.model.delete,
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