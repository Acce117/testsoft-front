
import { useSendRequest } from "@/common/utils/fetch";
import { userStore } from "../security/store/user-store";

/**
 * retrieve available tests for user
 * @returns reactive tests array
 */

export function getAsignedTests() {
    const url = `${import.meta.env.VITE_API_PATH}/gestion/group_for_test`;
    const queryParams = {
        attr: {
            fk_id_group: userStore().group,
            group_type: userStore().userType,
        },
        relations: ['test.arraytest_application'],
        relations_attr: {
            'test.arraytest_application': {
                attr: {
                    fk_id_user: userStore().ci
                },
                orderBy: 'date DESC'
            }
        }
    };
    return useSendRequest(true, url, queryParams);
}

export function getTest(idTest: number | string) {
    
    return useSendRequest(true, `${import.meta.env.VITE_API_PATH}/psi_test/${idTest}`, {
        
        relations:["series.questions.answers"]
    });
}

