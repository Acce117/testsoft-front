import { ref, type Ref } from "vue";
import type { TestExecution } from "../types/testExecution";
import { sendRequest } from "@/common/utils/fetch";
import type { Serie } from "../types/serie";

//TODO define the response's objects structure in API
export class Test{
    static getTest(idTest: number){
        let test = ref<TestExecution>();
        let loading = ref<boolean>(true);

        const url = `http://localhost/testsoft/api/web/gestion/serie`;

        sendRequest<Serie[]>(url,{
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