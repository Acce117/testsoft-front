import { sendRequest } from "@/common/utils/fetch";
import { ref } from "vue";
function resultsRequest( url: string) {
    let result = ref();
    let loading = ref(true);

    sendRequest(url)
        .then(res => {
            loading.value = false;
            result.value = res.data
        }).catch(err => {
            console.log(err);
            loading.value = false;
        })
    
    return {
        result,
        loading,
    };
}

export function getResults() {
    const url = `http://localhost/testsoft/api/web/gestion/application_result`;

    return resultsRequest(url);
}
