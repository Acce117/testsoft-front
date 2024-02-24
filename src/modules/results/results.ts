import { sendRequest } from "@/common/utils/fetch";
import { ref } from "vue";
function resultsRequest(queryParams: Object, url: string) {
    let result = ref();
    let loading = ref(true);
    let error = ref(false);

    sendRequest(url, queryParams)
        .then(res => {
            console.log(res.data)
            loading.value = false;
            result.value = res.data
        }).catch(err => {
            console.log(err);
            loading.value = false;
            error.value = true
        })

    return {
        result,
        loading,
        error
    };
}


export function getResults(ci: number | string) {
    const url = `${import.meta.env.VITE_API_PATH}/gestion/test_application`;

    return resultsRequest({
        attr: {
            "fk_id_user": ci
        },
        relations: ["arrayapplication_result", "test"],
        relations_attr: {
            "arrayapplication_result": {
                relations: "item"
            }
        }
    }, url);
}
export function getFinalResults(id_test_application: number | string) {
    const url = `${import.meta.env.VITE_API_PATH}/gestion/ERNESTO GEI`;

    return resultsRequest({
        id_test_application
    }, url);
}

