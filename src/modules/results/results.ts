import { useSendRequest } from "@/common/utils/fetch";


export function getResults(ci: number | string) {
    const url = `${import.meta.env.VITE_API_PATH}/gestion/test_application`;
    const queryParams = {
        attr: {
            "fk_id_user": ci
        },
        relations: ["arrayapplication_result", "test"],
        relations_attr: {
            "arrayapplication_result": {
                relations: "item"
            }
        }
    };

    return useSendRequest(true, url, queryParams);
}
export function getFinalResults(id_test_application: number | string) {
    const url = `${import.meta.env.VITE_API_PATH}/gestion/test/test_result`;
    const queryParams = {
        id_test_application
    };

    return useSendRequest(true, url, queryParams);
}

