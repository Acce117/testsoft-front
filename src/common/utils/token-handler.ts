function getToken (){
    return sessionStorage.getItem('token');
}

function storeToken (token: string){
    sessionStorage.setItem('token', token);
}



function getRefreshToken () {
    return localStorage.getItem('refreshToken');
}

function storeRefreshToken (refreshToken: string){
    localStorage.setItem('refreshToken', refreshToken);
}

function removeToken (){
    sessionStorage.removeItem('token');
}

function removeRefreshToken() {
    localStorage.removeItem('refreshToken');
}
const TokenHandler = {
    getToken,
    storeToken,
    getRefreshToken,
    storeRefreshToken,
    removeRefreshToken,
    removeToken
}

export default TokenHandler;