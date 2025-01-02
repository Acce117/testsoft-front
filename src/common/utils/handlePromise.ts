import type { Ref } from "vue";
import useEvents from "./useEvents";

 const handlePromise = async (promise: Promise, loading: Ref<boolean>, callBackOnSuccess: Function) => {
    loading.value = true
    promise().then(() => {
        useEvents().dispatch("error", {
            severity: "info",
            summary: 'operacioncompletada',
            detail: 'operacioncompletada',
            life: 3000,
        });
        callBackOnSuccess()
    }).catch(() => {
        useEvents().dispatch("error", {
            severity: "error",
            summary: "Error",
            detail: 'algo ha salido mal',
            life: 3000,
        });
    }).finally(() => loading.value = false)
}

export default handlePromise