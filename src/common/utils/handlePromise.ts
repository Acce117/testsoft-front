import type { Ref } from "vue";
import useEvents from "./useEvents";
import { i18n } from "@/plugins/i18n";

 const handlePromise = async (promise: Promise, loading: Ref<boolean>, callBackOnSuccess: Function) => {
    loading.value = true
    const {t} = i18n.global
    promise().then(() => {
        useEvents().dispatch("error", {
            severity: "info",
            summary: t('global.operation_succeded'), 
            detail: t('global.operation_succeded'),
            life: 3000,
        });
        callBackOnSuccess()
    }).catch((e) => {
        console.log(e)
        useEvents().dispatch("error", {
            severity: "error",
            summary: "Error",
            detail: t('global.error'),
            life: 3000,
        });
    }).finally(() => loading.value = false)
}

export default handlePromise