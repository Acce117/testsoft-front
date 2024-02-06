import { sendRequest } from "@/common/utils/fetch";
import { ref } from "vue";
import { userStore } from "../security/store/user-store";

function testRequest(queryParams: Object, url: string) {
    let result = ref();
    let loading = ref(true);

    sendRequest(url, queryParams)
        .then(res => {
            loading.value = false;
            result.value = res.data
        }).catch(err => {
            console.log(err);
            loading.value = false;
        })

    return {
        result,
        loading
    };
}

/**
 * retrieve available tests for user
 * @returns reactive tests array
 */

export function useTests() {
    const url = `http://localhost/testsoft/api/web/gestion/group_for_test`;

    return testRequest({
        attr: {
            fk_id_group: userStore().group,
            group_type: userStore().userType
        }
    }, url);
}

export function getTest(idTest: number | string) {
    const url = `http://localhost/testsoft/api/web/gestion/serie`;

    return testRequest({
        attr: {
            fk_id_test: idTest
        },
        relations: ['arrayquestion.arrayanswer']
    }, url);
}

