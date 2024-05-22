import axios from "axios";
import createAuthRefreshInterceptor from 'axios-auth-refresh';




export async function loginUserRequest ({username, password}) {
    const response = await axios.post('https://dummyjson.com/auth/login', { username, password });
    console.log(response)
    const { token, user } = response.data;

    return response.data
}

const refreshAuthLogic = (failedRequest) =>
    axios.post('https://dummyjson.com/auth/me').then((tokenRefreshResponse) => {
        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
        return Promise.resolve();
    });