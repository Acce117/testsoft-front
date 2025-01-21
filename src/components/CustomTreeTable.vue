<template>
    <Card>
        <template #content>
            <TreeTable sortMode="multiple" removableSort ref="dt" size="small" tableStyle="min-width: 50rem" paginator
                :value="data" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">


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



                                <Button icon="pi pi-refresh" severity="secondary" @click="refetch()" />
                            </div>

                        </div>
                    </div>

                </template>
                <Column expander :field="fiedAsExpander.field" :header="fiedAsExpander.header">

                    <template #body=slotProps>

                        <Skeleton v-if="isRefetching || isPending" width="60%" borderRadius=".4rem" height="1.5rem" />
                        <div overflow-auto text-sm v-else>
                            <span v-if="slotProps.node[fiedAsExpander.field] !== undefined">{{ typeof
                                slotProps.node[fiedAsExpander.field] == 'string' ?
                                slotProps.node[fiedAsExpander.field].length < 20 ? slotProps.node[fiedAsExpander.field]
                                    : slotProps.node[fiedAsExpander.field].substring(0, 20) + '...' :
                                slotProps.node[fiedAsExpander.field] }}</span>
                                    <span v-else>-</span>
                        </div>
                    </template>

                </Column>


                <Column v-for="(col, index) in props.model.getColumns().filter(c => !c.expander)" :key="index" sortable
                    :field="col.field" :header="col.header">
                    <template #body=slotProps>

                        <Skeleton v-if="isRefetching || isPending" width="60%" borderRadius=".4rem" height="1.5rem" />
                        <div overflow-auto text-sm v-else>

                            <span v-if="slotProps.node[col.field] !== undefined">{{ typeof
                                slotProps.node[col.field] == 'string' ? slotProps.node[col.field].length < 20 ?
                                slotProps.node[col.field] : slotProps.node[col.field].substring(0, 20) + '...' :
                                slotProps.node[col.field] }}</span>
                                    <span v-else>-</span>
                        </div>
                    </template>


                </Column>
                <Column :field="fieldAsID" :header="$t('table.actions')">

                    <template #body=slotProps>
                        <Skeleton v-if="isRefetching || isPending" width="60%" borderRadius=".4rem" height="1.5rem" />

                        <div v-else class="custom-table-actions" gap-2>
                            <i class="pi pi-eye" v-tooltip="$t('table.view_information')"
                                @click="showElement(slotProps.node)" />
                            <i class="pi pi-file-edit" v-tooltip="$t('table.update')"
                                @click="showUpdate(slotProps.node)" />

                            <i v-if="props.model.getFieldAsActive() == ''" v-tooltip="$t('table.delete')"
                                @click="deleteElement($event, slotProps.data)" class="pi pi-trash" />
                            <i v-else-if="slotProps.data[props.model.getFieldAsActive()] == true || slotProps.data[props.model.getFieldAsActive()] == 1"
                                v-tooltip="$t('table.desactivate')" @click="desactivateElement($event, slotProps.data)"
                                class="pi pi-trash" />

                            <i v-else-if="slotProps.data[props.model.getFieldAsActive()] == false || slotProps.data[props.model.getFieldAsActive()] == 0"
                                v-tooltip="$t('table.recover')" @click="activateElement($event, slotProps.data)"
                                class="pi pi-history" />

                        </div>
                    </template>
                </Column>
                <template #empty> {{ $t('table.no_results') }} </template>

            </TreeTable>
            <!-- <h2 v-else-if="isError" class="error">{{ $t('table.something_wrong') }}</h2> -->
        </template>
    </Card>

    <Dialog v-model:visible="showInfoDialog" modal :header="$t('table.information')"
        class="w-4/5 max-w-50rem min-w-25rem min-h-15rem">
        <LoadingPanel v-if="isPendingOfOne || isRefetchingOfOne || isErrorOfOne" centered relative
            :loading="isPendingOfOne || isRefetchingOfOne" :error="isErrorOfOne" :refetch="refetchOfOne" />

        <div v-else-if="isSuccessOfOne" class="dialog-form">
            <slot name="view-element"></slot>
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
                <VButton w-8rem :disabled="isAddPending" type="submit">
                    <span v-if="!isAddPending">{{ $t("table.save") }} </span>
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
                <VButton w-8rem :disabled="isUpdatePending" type="submit">
                    <span v-if="!isUpdatePending">{{ $t("table.save") }} </span>
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
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { FilterMatchMode } from '@primevue/core/api';
import { ref, watch } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useI18n } from 'vue-i18n';
import { BaseModel } from '@/common/utils/BaseModel';
import Skeleton from 'primevue/skeleton';
import TreeTable from 'primevue/treetable';
import VButton from './VButton.vue';

useQueryClient()
const props = defineProps({
    title: String,
    model: BaseModel,
    queryOptions: {
        requestPDF: Function
    },

})

const fieldAsID = props.model.getFieldAsID()

const fiedAsExpander = props.model.getColumns().filter(c => c.expander)[0]

const queryKey = props.model.constructor.name
const confirm = useConfirm();
const toast = useToast();

const { data, isPending, isSuccess, isError, isRefetching, refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
        return props.model.getElementsForTreeTable()
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


const addElement = () => {
    mutateAdd()
}
const updateElement = () => {
    mutateUpdate()
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

            //updateObject[props.fieldAsActive] = false;
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

            //updateObject[props.fieldAsActive] = true;
            mutateUpdate({ id: data[props.fieldAsID], data: updateObject })
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
    mutationFn: () => props.model.update(),
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