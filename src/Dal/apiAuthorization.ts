import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'c42da93b-73d1-47c9-9b91-cb5950b4c7d5'
    }
});

export const apiAuthorization = {
    authorization(email: string, password: string, rememberMe: boolean, captcha: boolean = false) {
        return instance.post('auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data)
    }
};


