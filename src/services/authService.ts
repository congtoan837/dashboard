import axios from 'axios';

const SERVER_URL = 'http://127.0.0.1:8081'; // Thay đổi theo URL của API backend

interface LoginResponse {
    code: number;
    result: {
        accessToken: string;
        refreshToken: string;
    };
}

interface RefreshResponse {
    code: number;
    result: {
        accessToken: string;
    };
}

interface AuthResult {
    success: boolean;
    accessToken?: string;
    message?: string;
}

class AuthService {
    static async login(username: string, password: string): Promise<AuthResult> {
        try {
            const response = await axios.post<LoginResponse>(`${SERVER_URL}/login`, {
                username,
                password,
            });

            // Lưu accessToken và refreshToken vào localStorage
            localStorage.setItem('accessToken', response.data.result.accessToken);
            localStorage.setItem('refreshToken', response.data.result.refreshToken);

            return {success: true, accessToken: response.data.result.accessToken};
        } catch (error) {
            return {success: false, message: 'Login failed. Please check your credentials.'};
        }
    }

    static async refreshToken(): Promise<AuthResult> {
        try {
            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                return {success: false, message: 'No refresh token available'};
            }

            const response = await axios.post<RefreshResponse>(`${SERVER_URL}/refreshToken`, {
                refreshToken,
            });

            // Cập nhật accessToken mới vào localStorage
            localStorage.setItem('accessToken', response.data.result.accessToken);
            return {success: true, accessToken: response.data.result.accessToken};

        } catch (error) {
            return {success: false, message: 'Error during token refresh'};
        }
    }

    static logout(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
}

export default AuthService;
