import axios from 'axios';

const SERVER_URL = 'http://127.0.0.1:8081'; // Thay đổi theo URL của API backend

class AuthService {
    static async login(username, password) {
        try {
            const response = await axios.post(`${SERVER_URL}/login`, {
                username,
                password,
            });

            if (response.status === 200 && response.data.code === 1) {
                // Lưu accessToken và refreshToken vào localStorage
                localStorage.setItem('accessToken', response.data.result.accessToken);
                localStorage.setItem('refreshToken', response.data.result.refreshToken);
                return { success: true, accessToken: response.data.result.accessToken };
            } else {
                return { success: false, message: 'Invalid response code' };
            }
        } catch (error) {
            return { success: false, message: 'Login failed. Please check your credentials.' };
        }
    }

    static async refreshToken() {
        try {
            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                return { success: false, message: 'No refresh token available' };
            }

            const response = await axios.post(`${SERVER_URL}/refreshToken`, {
                refreshToken,
            });

            if (response.status === 200 && response.data.code === 1) {
                // Cập nhật accessToken mới vào localStorage
                localStorage.setItem('accessToken', response.data.result.accessToken);
                return { success: true, accessToken: response.data.result.accessToken };
            } else {
                return { success: false, message: 'Failed to refresh token' };
            }
        } catch (error) {
            return { success: false, message: 'Error during token refresh' };
        }
    }
}

export default AuthService;
