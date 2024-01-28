export async function sendRequest(
    url: string,
    data?: Object,
    method: 'GET'|'POST'|'DELETE'|'PATCH' ='GET'
    ){
    try{
        const options: RequestInit = {
            mode: 'cors',
            method: method,
        }

        if(data) options.body = JSON.stringify(data);

        return await fetch(url, options);
    }catch(err){
        console.log(err);
    }
}