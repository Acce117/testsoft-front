import { sendRequest } from "@/common/utils/fetch";
import type { TestInterface } from "./types/test-interface";
import { ref } from "vue";

import { user } from '../security/classes/user';

/**
 * retrieve available tests for user
 * @returns reactive TestInterface array
 */
export function useTests(){
    let tests = ref<TestInterface[]>([]);

    const url = `http://localhost/testsoft/api/web/gestion/group_for_test`;

    sendRequest<TestInterface[]>(url, {
        attr: {
            fk_id_group: user?.group,
            group_type: user?.userType
        }
    }).then(res=>{
        tests.value = res.data;
    });
    
    return {
        tests
    };
}