import { ref, type Ref } from "vue";
import type { TestExecutionInterface } from "../types/testExecution-interface";
import { sendRequest } from "@/common/utils/fetch";
import type { SerieInterface } from "../types/serie-interface";

//TODO define the response's objects structure in API
export class Test{
    static getTest(idTest: number | string){
        let test = ref<TestExecutionInterface>();
        let loading = ref<boolean>(true);

        const url = `http://localhost/testsoft/api/web/gestion/serie`;

        sendRequest<SerieInterface[]>(url,{
            attr: {
                fk_id_test: idTest
            }
        }).then(res=>{
            loading.value = false;
            test.value = {
                series: res.data
            };
            console.log(test.value);
        })

        return {
            test,
            loading
        };
    }
}