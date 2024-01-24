export async function sendRequest(
    url: string,
    data?: Object,
    method: 'GET'|'POST'|'DELETE'|'PATCH' ='GET'
    ){
    try{
        const options: RequestInit = {
            mode: 'cors',
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if(data) options.body = JSON.stringify(data);

        const response = await fetch(url, options);

        console.log(await response.json());
    }catch(err){
        console.log(err);
    }
}