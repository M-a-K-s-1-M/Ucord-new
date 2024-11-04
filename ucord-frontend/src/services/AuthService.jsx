import axios from 'axios';

// const API_URL = 'http://localhost/auth-service'; // URL вашего бекенда

class AuthService {
    static login(email, password) {
        return axios.post(`http://localhost:8080/api/v1/auth/signin`, {
            email,
            password,
        }).then(response => {
            if (response.data.accessToken && response.data.refreshToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
            }
            return response.data;
        });
    }

    // Удаление access и refresh токена из localStorage
    static logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    // Возварщает access токен из localStorage
    static getAccessToken() {
        return localStorage.getItem('accessToken') ?? null;
    }

    // Возварщает refresh токен из localStorage
    static getRefreshToken() {
        return localStorage.getItem('refreshToken') ?? null;
    }

    // Обновляет access и refresh токен и добавляет их в localStorage
    static refreshTokens(refreshToken) {
        return axios.post(`http://localhost:8080/api/v1/auth/refresh-token`, {
            refreshToken,
        }).then(response => {
            if (response.data.accessToken && response.data.refreshToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
            }
            return response.data;
        });
    }
}

export default AuthService;