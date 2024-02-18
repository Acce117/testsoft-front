import { sendRequest } from "@/common/utils/fetch";
import { ref } from "vue";
import { userStore } from "../security/store/user-store";

function testRequest(queryParams: Object, url: string) {
    let result = ref();
    let loading = ref(true);
    let error = ref(false);

    sendRequest(url, queryParams)
        .then(res => {
            loading.value = false;
            result.value = res.data
        }).catch(err => {
            console.log(err);
            loading.value = false;
            error.value=true
        })
    
    return {
        result,
        loading,
        error
    };
}

/**
 * retrieve available tests for user
 * @returns reactive tests array
 */

export function useTests() {
    const url = `${import.meta.env.VITE_API_PATH}/gestion/group_for_test`;

    return testRequest({
        attr: {
            fk_id_group: userStore().group,
            group_type: userStore().userType
        }
    }, url);
}

export function getTest(idTest: number | string) {
    const url = `${import.meta.env.VITE_API_PATH}/gestion/test/view/${idTest}`;

    return testRequest({
        attr:{
            id_test: idTest
        },
        relations: ["arrayserie.arrayquestion.arrayanswer", "arrayserie.arrayquestion.arrayquestion_top_value"]
    }, url);
}

