import { sendRequest } from "@/common/utils/fetch";
import { ref } from "vue";

import { user } from '../security/classes/user';

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
            fk_id_group: user?.group,
            group_type: user?.userType
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

