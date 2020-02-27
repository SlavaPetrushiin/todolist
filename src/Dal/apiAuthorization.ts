import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export const apiAuthorization = {
    authorization(email: string, password: string, rememberMe: boolean, captcha: boolean = false) {
        return instance.post('auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data)
    }
};


