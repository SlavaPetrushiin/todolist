import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {"API-KEY": "29f9fa1b-6eaa-4e21-8fb8-288f6a026f6c"}
});

export const apiAuthorization = {
    authorization(email: string, password: string, rememberMe: boolean, captcha: boolean = false) {
        return instance.post('auth/login', {email :'petrushin.vyac@yandex.ru', password : '488661632', rememberMe, captcha})
            .then(response => {
            return response.data
            })
    }
};


