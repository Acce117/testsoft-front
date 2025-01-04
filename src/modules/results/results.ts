import { useSendRequest } from "@/common/utils/fetch";


export function getResults(id_user: number | string) {
    const url = `${import.meta.env.VITE_API_PATH}/test_app`;
    const queryParams = {
        // attr: {
        //     "fk_id_user": id_user
        // },
        // relations: ["arrayapplication_result", "test"],
        // relations_attr: {
        //     "arrayapplication_result": {
        //         relations: "item"
        //     }
        // }
    };

    return useSendRequest(true, url, queryParams);
}
export function getFinalResults(id_test_application: number | string) {
    const url = `${import.meta.env.VITE_API_PATH}/execute_test/${id_test_application}`;
    

    return useSendRequest(true, url);
}

