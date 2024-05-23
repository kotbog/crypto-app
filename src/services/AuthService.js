import axios from "axios";
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {store} from "../store/store";
import {setToken} from "../store/slices/AuthSlice";




export async function loginUserRequest ({username, password}) {
    const response = await axios.post('https://dummyjson.com/auth/login', { username, password, expiresInMins: 2 });
    return response.data
}

export async function authUserRequest({token}) {
    const response = await axios.get( 'https://dummyjson.com/auth/me', {headers: {
            'Authorization': `Bearer ${token}`}});
    return response.data;

}

const refreshAuthLogic = (failedRequest) =>{
    const {token} = store.getState().auth;
    return axios.post('https://dummyjson.com/auth/me', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((tokenRefreshResponse) => {
        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
        console.log(tokenRefreshResponse.data.token)
        store.dispatch(setToken(tokenRefreshResponse.data.token))
        return Promise.resolve();
    });
}
createAuthRefreshInterceptor(axios, refreshAuthLogic);