import { ref, type Ref } from "vue";
import type { TestExecution } from "../types/testExecution";
import { sendRequest } from "@/common/utils/fetch";

//TODO define the response's objects structure in API
export class Test{
    static getTest(idTest: number): Ref<Test> | 'loading'{
        let test = ref<TestExecution>();

        const url = 'http://localhost/testsoft/api/web/gestion/test';

        sendRequest<TestExecution>(url, {
            attr:{
                id_test: idTest
            }
        }).then(res=>{
            test.value = res.data;
            console.log(test.value);
        })

        return 'loading';
    }
}