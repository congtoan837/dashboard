import axios from 'axios';
import AuthService from './authService'; // Import để xử lý refresh token

const SERVER_URL = 'http://127.0.0.1:8081/admin/role'; // Thay đổi theo URL của API backend

// Tạo một instance của axios
const axiosInstance = axios.create({
    baseURL: SERVER_URL,
});

// Tạo interceptor để tự động refresh token nếu token hết hạn
axiosInstance.interceptors.response.use(
    (response) => response, // Nếu response thành công
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Gọi hàm refreshToken để lấy token mới
            const refreshResponse = await AuthService.refreshToken();
            if (refreshResponse.success) {
                // Cập nhật token mới
                localStorage.setItem('accessToken', refreshResponse.accessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${refreshResponse.accessToken}`;

                // Thực hiện lại yêu cầu ban đầu với token mới
                originalRequest.headers['Authorization'] = `Bearer ${refreshResponse.accessToken}`;
                return axiosInstance(originalRequest);
            } else {
                window.location.href = '/login'; // Nếu refresh thất bại, chuyển về trang đăng nhập
            }
        }

        return Promise.reject(error);
    }
);

class RoleService {
    static async getRoles(page = 0, size = 20) {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axiosInstance.get('/get', {
                headers: { Authorization: `Bearer ${token}` },
                params: { page, size }
            });

            return { success: true, roles: response.data.result };
        } catch (error) {
            return { success: false, message: 'Failed to fetch users. Please try again.' };
        }
    }
}

export default RoleService;
